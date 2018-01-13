var express = require('express');
var axios = require('axios');
var redis = require('redis');
var data = require('./dataParser');

var client = redis.createClient();
client.on('connect', function() {
  console.log('Connected to Redis ...')
})

var app = express();

app.use(express.static('dist'));

app.get("/", function(req, res){
  res.sendFile(__dirname + '/index.html')
})

app.get('/search', function(req, res) {
  if (!req.query.search) {
    res.send(data.tweets)
  } else {
    let searchResults = data.search(req.query.search);
    res.send(searchResults)
  }

  // let id = req.body.id;
  // client.hgetall(id, function(err, obj) {
  //   if (!obj) {
  //     res.render('search', {
  //       error: 'No results found'
  //     });
  //   } else {
  //     obj.id = id;
  //     res.render('results', {
  //       user: obj
  //     })
  //   }
  // })
})

var port = process.env.PORT || 3001;
app.listen(port, () => console.log('Example app listening on port 3001!'))

