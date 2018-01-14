const fs = require('fs');
const path = require('path');

let prevSearches = {};
const fileData = fs.readFileSync(path.join(__dirname, '../tweetData.txt'), 'utf8');

// Separates file string into an array of tweet strings
let parseFileIntoTweets = (data) => {
  let tweets = data.split('nytimes');
  tweets[0] = '2014' + tweets[0].split('2014')[1];
  for (let i = 0; i < tweets.length; i++) {
    tweets[i] = tweets[i].split('\n').join(' ').trim();
  }
  return tweets;
}

// Creates an array of objects that contains a tweet and a key-value pair for each word in the tweet.
// The key-value pair excludes less desired search words.
let createTweetObjects = (tweets) => {
  let excludedWords = ['after', 'although', 'as', 'if', 'though', 'because', 'before', 'even', 'that', 'the', 'is', 'unless', 'until', 'while', 'and', 'to', 'in', 'for', 'of', 'at', 'are', 'a', 'or'];
  let tweetData = [];
  for (let i = 0; i < tweets.length; i++) {
    let words = {};
    tweets[i].slice().split(' ').forEach((word) => {
      if (!excludedWords.includes(word.toLowerCase())) {
        words[word.toLowerCase()] = true;
      }
    })
    tweetData.push({
      tweet: tweets[i],
      words: words
    })
  }
  return tweetData;
}

// Creates a key-value pair word index where the key is each word and the value is an array
// of indices of tweets containing that word.
let createWordIndex = (tweetInfo) => {
  let wordIndex = {};
  tweetInfo.forEach((twt, index) => {
    for (let key in twt.words) {
      if (wordIndex[key]) {
        wordIndex[key].push(index);
      } else {
        wordIndex[key] = [index];
      }
    }
  })
  return wordIndex;
}

let tweets = parseFileIntoTweets(fileData);
let tweetData = createTweetObjects(tweets);
let index = createWordIndex(tweetData);

module.exports = {
  tweets: tweets,
  index: index,
  createTweetObjects: createTweetObjects,
  createWordIndex: createWordIndex
};

















