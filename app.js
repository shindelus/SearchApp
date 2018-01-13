import Tweets from './tweets';
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
          tweets: newData
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  searchHashtagOrHandle(input) {
    console.log(input)
    this.search(input)
  }

  renderText(text) {
    var tokens = text.split(/@(\S*)/g);
    for (var i = 1; i < tokens.length; i += 2) {
      let handle = '@' + tokens[i]
      tokens[i] = <u><span href='#' onClick={() => {
        this.searchHashtagOrHandle(handle)}}>{handle}</span></u>;
    }
    return <span className="line">{tokens}</span>;
  }

  handleChange(event) {
    this.setState({searchValue: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.search(this.state.searchValue)
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
