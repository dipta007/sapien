import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Axios from '../../Utilities/axios.js';
import PostNavBar from '../../Component/PostNavBar/PostNavBar.jsx';
import Loading from '../../Component/Loading/Loading';
import Votebox from '../../Component/Votebox/Votebox.jsx';
import { Markdown } from 'react-showdown';
import './Post.scss';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postid: '',
      post: {},
      loading: true
    };
  }

  componentDidMount = async () => {
    const { postid } = this.props.match.params;
    this.setState({ loading: true });
    if (this.state.postid !== postid) {
      const now = await Axios.get('/post/' + postid);
      console.log(now.data[0]);
      if (now.data.length > 0) {
        this.setState({
          postId: postid,
          post: now.data[0],
          loading: false
        });
      }
    }
  };

  render() {
    const { post } = this.state;
    return (
      <>
        <PostNavBar />
        <div className="post">{this.getPostDetails(post)}</div>
      </>
    );
  }

  getPostDetails = post => {
    if (this.state.loading) return <Loading />;
    return (
      <>
        <h1>{post.title}</h1>
        {this.getAuthor(post)}
        {this.getMediaCover(post)}
        {this.getDescription(post)}
      </>
    );
  };

  getAuthor = post => {
    return (
      <div className="author">
        <div>
          <img src={post.author.thumbnail} alt="author" />
          <span className="username">{post.author.username}</span>
        </div>
        <div>
          <Votebox
            upvotes={post.upvotes}
            downvotes={post.downvotes}
            align="row"
            postId={post.id}
          />
        </div>
      </div>
    );
  };

  getMediaCover = post => {
    return (
      <div className="media-cover">
        <img src={post.media.cover ? post.media.cover : post.media.thumbnail} />
      </div>
    );
  };

  getDescription = post => {
    return (
      <div className="description">
        <Markdown markup={post.description} />
      </div>
    );
  };
}

Post.propTypes = {};

export default withRouter(Post);
