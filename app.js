import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' , location: []};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.getLocation();
  }


  getLocation() {
    this.success = (pos) => {
      var crd = pos.coords;
      this.setState(() => ({
        location: [crd.longitude, crd.latitude]
      }));
      console.log(this.state.location);
    };

    this.error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(this.success, this.error, options);
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState(() => ({
      text: ''
    }));
  }

  render() {
    return (
      <div>
        <h3>CHOMP</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            GO
          </button>
        </form>
      </div>
    );
  }

}

ReactDOM.render(<TodoApp />, document.getElementById('root'));
