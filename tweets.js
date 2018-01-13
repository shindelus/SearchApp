import React from 'react';

class Tweets extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.tweets.map((tweet, index) => {
            return (
              <h5 key={index}> {tweet} </h5>
            );
          })}
      </div>
    );
  }
}

export default Tweets
