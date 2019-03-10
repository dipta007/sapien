import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Votebox.scss';
import Axios from '../../Utilities/axios';

class Votebox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upvotes: 0,
      downvotes: 0
    };
  }

  componentDidMount = async () => {
    let data = await Axios.post('/graphql', {
      query: `
        query {
          posts(id: "${this.props.postId}") {
            postid
            upvotes
            downvotes
          }
        }
      `
    });

    data = data.data.data.posts[0];
    this.setState({
      upvotes: data.upvotes,
      downvotes: data.downvotes
    });
  };

  thumbsUp = async e => {
    e.stopPropagation();
    await Axios.post('/uvote/' + this.props.postId);
    this.setState(prevState => {
      return {
        upvotes: prevState.upvotes + 1
      };
    });
  };

  thumbsDown = async e => {
    e.stopPropagation();
    await Axios.post('/dvote/' + this.props.postId);
    this.setState(prevState => {
      return {
        downvotes: prevState.downvotes + 1
      };
    });
  };
  render() {
    const { align } = this.props;
    const { upvotes, downvotes } = this.state;
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
  align: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired
};

export default Votebox;
