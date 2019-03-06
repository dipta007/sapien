import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import './Loading.scss';

class Loading extends Component {
  render() {
    return (
      <div className="loader">
        <Loader type="Ball-Triangle" color="#00BFFF" height="100" width="100" />
      </div>
    );
  }
}

export default Loading;
