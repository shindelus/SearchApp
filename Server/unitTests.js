var data = require('./dataParser');
var helpers = require('./helpers');

let assert = (testName, actual, expected) => {
  if (expected === actual) {
    console.log(testName + ' PASSED')
  } else {
    console.log(testName + ' FAILED, expected ' + expected + ' but got ' + actual);
  }
}

// Testing createTweetObjects
assert('Test: Multi-Word Tweet Objects With Excluded Word --',
  JSON.stringify(data.createTweetObjects(['Long day', 'At home'])), JSON.stringify([{
      tweet: 'Long day',
      words: {
        'long': true,
        'day': true
      }
    },
    {
      tweet: 'At home',
      words: {
        'home': true
      }
    }]));

assert('Test: One Word Tweet Objects --',
  JSON.stringify(data.createTweetObjects(['Long', 'Home'])), JSON.stringify([{
      tweet: 'Long',
      words: {
        'long': true
      }
    },
    {
      tweet: 'Home',
      words: {
        'home': true
      }
    }]));


// Testing createWordIndex
assert('Test: Multi-Word Word Index With Excluded Word --', JSON.stringify(data.createWordIndex([{
    tweet: 'Long day',
    words: {
      'long': true,
      'day': true
    }
  },
  {
    tweet: 'At home',
    words: {
      'home': true
    }
  }])), JSON.stringify({
    'long': [0],
    'day': [0],
    'home': [1]
  }));

assert('Test: One-Word Word Index --', JSON.stringify(data.createWordIndex([{
    tweet: 'Long',
    words: {
      'long': true
    }
  },
  {
    tweet: 'Home',
    words: {
      'home': true
    }
  }])), JSON.stringify({
    'long': [0],
    'home': [1]
  }));


// Testing Search
assert('Test: One Word Input --', JSON.stringify(helpers.search('improving')),
  JSON.stringify(['206', '449']));

assert('Test: Multi-Word Input --', JSON.stringify(helpers.search('climate change')),
  JSON.stringify(['1','121','290','46','154']));


// Testing createSortedIndices
assert('Test: Sort Indices From Random Index/Count Objects --',
  JSON.stringify(helpers.createSortedIndices({ 23: 4, 12: 6, 2: 1, 45: 2 })),
  JSON.stringify(['12','23','45','2']));

assert('Test: Sort Indices From Random Index/Count Objects --',
  JSON.stringify(helpers.createSortedIndices({ 12: 2, 0: 4, 1: 1, 120: 2 })),
  JSON.stringify(['0','12','120','1']));


// Testing LookupTweets
assert('Test: Lookup A Single Tweet --', JSON.stringify(helpers.lookupTweets([100])),
  JSON.stringify(['2014-06-01 01:29:08 Life in the valley of death http://t.co/6WUAOS3fJi']));

assert('Test: Lookup Multiple Tweets --', JSON.stringify(helpers.lookupTweets([100, 200, 300])),
  JSON.stringify([ '2014-06-01 01:29:08 Life in the valley of death http://t.co/6WUAOS3fJi',
  '2014-06-05 20:05:47 U.S. Commander in Afghanistan Tapped to Lead Marine Corps http://t.co/sMH7wZq5Am',
  '2014-06-03 11:18:32 Euro Zone Edges Closer to Dreaded Deflation http://t.co/C80zn37FG8' ]));










































