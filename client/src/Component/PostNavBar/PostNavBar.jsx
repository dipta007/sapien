import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';
import './PostNavbar.scss';

class PostNavBar extends Component {
  backButton = () => {
    this.props.history.push('/posts');
  };
  render() {
    return (
      <div className="post-navbar">
        <span className="home" onClick={this.backButton}>
          <FontAwesomeIcon
            icon={faLongArrowAltLeft}
            className="home-icon"
            size="3x"
          />
        </span>
      </div>
    );
  }
}

PostNavBar.propTypes = {};

export default withRouter(PostNavBar);
