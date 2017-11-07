var express = require('express');
var axios = require('axios');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');



url = 'https://www.yelp.com/biz/el-farolito-san-francisco-2';
var reviews = [];
var pageNum = 0;

while (pageNum < 500){
  if (pageNum < 20) {
    pageStr = '';
  } else {
    var pageStr = '?start=' + pageNum.toString();
  }
  axios.get(url + pageStr)
    .then((result) => {
      var $ = cheerio.load(result.data);
      $('.review-content p').each(function(i, el) {
        var tempReview = ''
        el.children.forEach((node)=> {
          if (node.data) {
            tempReview += ' ' + node.data
          }
        })
        reviews.push(tempReview);
      });
    })
  pageNum += 20;
}

let blewMyMind = [];
let eatAgain = [];
let notEatAgain = [];

separateSentences = (string) => {
  return string.split('');
}

parseSentence = (string) => {

}



// setTimeout(() => {
//   console.log(reviews[12]);
// }, 3000);


// request(url, (err, res, body) => {
//   var $ = cheerio.load(body);
//   $('.review-content p').each(function(i, el) {
//     var tempReview = ''
//     el.children.forEach((node)=> {
//       if (node.data) {
//         tempReview += ' ' + node.data
//       }
//     })
//     reviews.push(tempReview);
//   });
//   console.log(reviews);
// })





// while (pageNum < 1000){
//   if (pageNum < 20) {
//     pageStr = '';
//   } else {
//     var pageStr = '?start=' + pageNum.toString();
//   }
//   request(url + pageStr, (err, res, body) => {
//     var $ = cheerio.load(body);
//     console.log($)
//     $('.review-content p').each(function(i, el) {
//       var tempReview = ''
//       el.children.forEach((node)=> {
//         if (node.data) {
//           tempReview += ' ' + node.data
//         }
//       })
//       reviews.push(tempReview);
//     });
//   })
//   pageNum += 20;
//   console.log(reviews);
// }



var app = express();

app.use(express.static('dist'));

app.get("/", function(req, res){
  res.sendFile(__dirname + '/index.html')
})

var port = process.env.PORT || 3001;
app.listen(port, () => console.log('Example app listening on port 3001!'))

