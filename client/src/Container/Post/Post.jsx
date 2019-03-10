import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Markdown } from 'react-showdown';
import Axios from '../../Utilities/axios';
import PostNavBar from '../../Component/PostNavBar/PostNavBar';
import Loading from '../../Component/Loading/Loading';
import Votebox from '../../Component/Votebox/Votebox';
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
    let { postid } = this.props.match.params;
    // storybook to work
    if (!postid) postid = '1';
    this.setState({ loading: true });
    if (this.state.postid !== postid) {
      const gql = await Axios.post('/graphql', {
        query: `
          query {
            posts(id: "${postid}") {
              totalCount
              postid
              title
              description
              createdat
              author {
                userid
                username
                userthumbnail
              }
              media {
                mediaid
                mediacover
                mediathumbnail
              }
            }
          }
        `
      });
      const { posts } = gql.data.data;
      if (posts.length > 0) {
        this.setState({
          postId: postid,
          post: posts[0],
          loading: false
        });
      }
    }
  };

  getPostDetails = (post) => {
    const { loading } = this.state;
    if (loading) return <Loading />;
    return (
      <>
        <h1>{post.title}</h1>
        {this.getAuthor(post)}
        {this.getMediaCover(post)}
        {this.getDescription(post)}
      </>
    );
  };

  getAuthor = post => (
    <div className="author">
      <div>
        <img src={post.author.userthumbnail} alt="author" />
        <span className="username">{post.author.username}</span>
      </div>
      <div>
        <Votebox align="row" postId={post.postid} />
      </div>
    </div>
  );

  getMediaCover = post => (
    <div className="media-cover">
      <img
        src={
          post.media.mediacover
            ? post.media.mediacover
            : post.media.mediathumbnail
        }
        alt="media cover"
      />
    </div>
  );

  getDescription = post => (
    <div className="description">
      <Markdown markup={post.description} />
    </div>
  );

  render() {
    const { post } = this.state;
    return (
      <>
        <PostNavBar />
        <div className="post">{this.getPostDetails(post)}</div>
      </>
    );
  }
}

export default withRouter(Post);
