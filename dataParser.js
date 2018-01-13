const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(path.join(__dirname, './tweetData.txt'), 'utf8');

// Separates file string into an array of tweet strings
let parseFileIntoTweets = (data) => {
  let tweets = data.split('nytimes');
  tweets[0] = '2014' + tweets[0].split('2014')[1];
  for (let i = 0; i < tweets.length; i++) {
    tweets[i] = tweets[i].split('\n').join(' ').trim();
  }
  return tweets;
}

// Creates an array of objects that contains a tweet and a key-value pair for each word in the tweet
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

// creates a key-value pair word index where the key is the word and the value is an array of indices of tweets containing that word
let createWordIndex = (tweetInfo) => {
  let wordIndex = {};
  tweetInfo.forEach((t, index) => {
    for (let key in t.words) {
      if (wordIndex[key]) {
        wordIndex[key].push(index);
      } else {
        wordIndex[key] = [index];
      }
    }
  })
  return wordIndex;
}

// creates an array of indices to be sorted for relevance
let createSortedIndices = (indexCount) => {
  let orderedIndices = [];
  for (let key in indexCount) {
    orderedIndices.push([key, indexCount[key]]);
  }
  orderedIndices.sort((a, b) => {
    return b[1] - a[1];
  })
  console.log(orderedIndices)
  return orderedIndices;
}

// looks up the tweets using the sorted indices and saves them as results
let lookupTweets = (indices) => {
  let results = [];
  indices.forEach((index) => {
    results.push(tweets[index[0]]);
  })
  return results;
}

// checks each word in search, counts the word matches and corresponding tweet indices, then looks up tweets in order
let search = (searchInput) => {
  let indexWordCountObj = {};
  let searchedWords = searchInput.trim().split(' ');
  searchedWords.forEach((searchedWord) => {
    // if the search input word is in the index, put it in the indexWordCountObj along with a count
    let sWord = searchedWord.toLowerCase();
    if (index[sWord]) {
      index[sWord].forEach((index) => {
        if (indexWordCountObj[index]) {
          indexWordCountObj[index]++;
        } else {
          indexWordCountObj[index] = 1;
        }
      })
    }
  })
  return lookupTweets(createSortedIndices(indexWordCountObj));
}

let tweets = parseFileIntoTweets(fileData);
let tweetData = createTweetObjects(tweets);
let index = createWordIndex(tweetData);

module.exports = { search: search, tweets: tweets };

















