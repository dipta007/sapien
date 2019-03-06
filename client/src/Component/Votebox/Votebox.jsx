import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Votebox.scss';
import Axios from '../../Utilities/axios';

class Votebox extends Component {
  thumbsUp = async e => {
    e.stopPropagation();
    await Axios.post('/uvote/' + this.props.postId);
  };

  thumbsDown = async e => {
    e.stopPropagation();
    await Axios.post('/dvote/' + this.props.postId);
  };
  render() {
    const { upvotes, downvotes, align } = this.props;
    return (
      <div className={`vote-box-${align}`}>
        <FontAwesomeIcon
          icon={faThumbsUp}
          className="vote"
          onClick={this.thumbsUp}
        />
        <div>{upvotes - downvotes}</div>
        <FontAwesomeIcon
          icon={faThumbsDown}
          className="vote"
          onClick={this.thumbsDown}
        />
      </div>
    );
  }
}

Votebox.propTypes = {
  upvotes: PropTypes.number.isRequired,
  downvotes: PropTypes.number.isRequired,
  align: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired
};

export default Votebox;
