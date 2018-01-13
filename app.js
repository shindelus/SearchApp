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
        <Tweets tweets={this.state.tweets} />
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('root'));
