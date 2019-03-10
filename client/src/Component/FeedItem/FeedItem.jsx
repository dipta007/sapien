import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './FeedItem.scss';
import Votebox from '../Votebox/Votebox';

class FeedItem extends Component {
  goToPost = id => {
    this.props.history.push('posts/' + this.props.payload.postid);
  };
  render() {
    const { payload } = this.props;
    const { author } = payload;
    const { media } = payload;
    return (
      <div className="feed-item" onClick={() => this.goToPost(payload.postid)}>
        <Votebox align="col" postId={payload.postid} />
        <img
          className="media-thumb"
          src={media.mediathumbnail}
          alt="thumbanail of the user"
        />
        <div className="info-box">
          <div className="title">{payload.title}</div>
          <div className="author-box">
            <img src={author.userthumbnail} alt="userImage" />
            <div className="author-name">{author.username}</div>
          </div>
          <div className="time">
            Time:
            <span className="time-date">
              {new Date(payload.createdat).toDateString()}
            </span>
          </div>
          {/* <div className="description">
            {payload.description.slice(0, 500) +
              (payload.description.length > 500 ? '...' : '')}
          </div> */}
        </div>
      </div>
    );
  }
}

FeedItem.propTypes = {
  payload: PropTypes.shape({
    postid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    author: PropTypes.shape({
      userthumbnail: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired
    }),
    createdat: PropTypes.number.isRequired,
    media: PropTypes.shape({
      cover: PropTypes.string,
      thumbnail: PropTypes.string.isRequired
    })
  }).isRequired
};

export default withRouter(FeedItem);
