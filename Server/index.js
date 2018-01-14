var express = require('express');
var axios = require('axios');
var redis = require('redis');
var helpers = require('./helpers');
var path = require('path');

var client = redis.createClient();

client.on('connect', function() {
  console.log('Connected to Redis ...');
})

var app = express();
app.use(express.static(path.join(__dirname, '../dist')));

app.get("/", function(req, res){
  res.sendFile(path.join(__dirname, '../Client/index.html'));
});

// Search api checks to see if redis has previous search results and returns results
// if they exist.  If not, it runs the search function and sends back results
app.get('/search', function(req, res) {
  // if no query, return all tweets
  if (!req.query.search) {
    res.send(helpers.tweets);
  } else {
    // check redis client for prev search results
    client.exists(req.query.search.toLowerCase(), function(err, reply) {
      if (reply === 1) {
        client.lrange(req.query.search.toLowerCase(), 0, -1, (err, reply) => {
          if (err) {
            console.log(err);
          }
          res.send(helpers.lookupTweets(reply.map(v => Number(v))));
        });
      } else {
        // search returns sorted indices of the resulting tweets
        let sortedIndices = helpers.search(req.query.search.toLowerCase());
        if (sortedIndices.length < 1) {
          res.send();
        } else {
          client.rpush(req.query.search.toLowerCase(), sortedIndices)
          res.send(helpers.lookupTweets(sortedIndices.map(v => Number(v))));
        }
      };
    })
  }
});

var port = process.env.PORT || 3001;
app.listen(port, () => console.log('Example app listening on port 3001!'));

















