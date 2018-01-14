import Tweets from './Components/tweets';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      searchValue: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.search = this.search.bind(this);
    this.renderText = this.renderText.bind(this);
    this.searchHashtagOrHandle = this.searchHashtagOrHandle.bind(this);
    this.linkHashtags = this.linkHashtags.bind(this);
    this.linkHandles = this.linkHandles.bind(this);
  }

  componentWillMount() {
    this.search();
  }

  search(input) {
    axios.get('/search', { params: { search: input } })
      .then(results => {
        let newData;
        if (results.data.length < 1) {
          newData = ['Sorry, No Results Found'];
        } else {
          newData = results.data;
        }
        this.setState({
          tweets: newData,
          searchValue: ''
        });
      })
      .catch(error => {
        console.log(error)
      });
  }

  searchHashtagOrHandle(input) {
    this.search(input);
  }

  renderText(text) {
    return this.linkHandles(text);
  }

  linkHashtags(text) {
    var tokens = text.split(/#(\S*)/g);
    for (var i = 1; i < tokens.length; i += 2) {
      let hashtag = '#' + tokens[i];
      tokens[i] = <u><span href='#' onClick={() => {
        this.searchHashtagOrHandle(hashtag)}}>{hashtag}</span></u>;
    }
    return <span className="line">{tokens}</span>;
  }

  linkHandles(text) {
    var tokens = text.split(/@(\S*)/g);
    for (var i = 0; i < tokens.length; i += 1) {
      if (i % 2 === 1) {
        let handle = '@' + tokens[i];
        tokens[i] = <u><span href='#' onClick={() => {
          this.searchHashtagOrHandle(handle)}}>{handle}</span></u>;
      } else {
        tokens[i] = this.linkHashtags(tokens[i]);
      }
    }
    return <span className="line">{tokens}</span>;
  }

  handleChange(event) {
    this.setState({searchValue: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.search(this.state.searchValue);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Search NY Times Tweets<br />
            <input type="text" value={this.state.searchValue} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <Tweets searchHashtagOrHandle={this.searchHashtagOrHandle} renderText={this.renderText} tweets={this.state.tweets} />
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('root'));







