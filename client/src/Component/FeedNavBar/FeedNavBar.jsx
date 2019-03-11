import React, { Component } from 'react';
import { Input } from 'reactstrap';
import { PropTypes } from 'prop-types';
import './FeedNavBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';

class FeedNavBar extends Component {
  addPost = () => {
    this.props.history.push('/addPost');
  };
  render() {
    const { sortOrder, onChange, loading } = this.props;
    return (
      <div className="feed-navbar">
        <FontAwesomeIcon
          icon={faPlusCircle}
          size="3x"
          className="add-post"
          onClick={this.addPost}
        />
        <div className="sort-box">
          <span className="dropbox-label">Sort:</span>
          <Input
            type="select"
            className="sort-dropbox"
            value={sortOrder}
            onChange={onChange}
            disabled={loading}
          >
            <option>Most Voted</option>
            <option>Created by</option>
          </Input>
        </div>
      </div>
    );
  }
}

FeedNavBar.propTypes = {
  sortOrder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default withRouter(FeedNavBar);
