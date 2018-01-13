import React from 'react';
import Tweet from './tweet';

class Tweets extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.tweets.map((tweet, index) => {
          return (
            <Tweet searchHashtagOrHandle={this.props.searchHashtagOrHandle} key={index} renderText={this.props.renderText} tweet={tweet} />
          );
        })}
      </div>
    );
  }
}

export default Tweets