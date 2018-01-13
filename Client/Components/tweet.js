import React from 'react';
import Linkify from 'react-linkify';

class Tweet extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let text = this.props.renderText(this.props.tweet);
    return (
      <Linkify>
        <h5> {text} </h5>
      </Linkify>
    );
  }
}

export default Tweet