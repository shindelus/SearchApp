var data = require('./dataParser');
const fs = require('fs');
const path = require('path');

// Search checks each word in search input, counts the word matches and
// corresponding tweet indices, then return sorted indices of tweet results
let search = (searchInput) => {
  let indexWordCountObj = {};
  let searchedWords = searchInput.trim().split(' ');
  searchedWords.forEach((searchedWord) => {
    // if the search input word is in the index, put it in the
    // indexWordCountObj along with a count
    if (data.index[searchedWord]) {
      data.index[searchedWord].forEach((i) => {
        if (indexWordCountObj[i]) {
          indexWordCountObj[i]++;
        } else {
          indexWordCountObj[i] = 1;
        };
      });
    }
  });
  return createSortedIndices(indexWordCountObj);
};


// Creates an array of indices that are sorted for most word matches
let createSortedIndices = (indexCount) => {
  let orderedIndices = [];
  for (let key in indexCount) {
    orderedIndices.push([key, indexCount[key]]);
  }
  orderedIndices.sort((a, b) => {
    return b[1] - a[1];
  })
  orderedIndices = orderedIndices.map((v) => { return v[0]; })
  return orderedIndices;
}

// looks up the tweets using the sorted indices and returns them as results
let lookupTweets = (indices) => {
  let results = [];
  indices.forEach((index) => {
    results.push(data.tweets[index]);
  })
  return results;
}

module.exports = {
  search: search,
  tweets: data.tweets,
  lookupTweets: lookupTweets,
  createSortedIndices: createSortedIndices
};












