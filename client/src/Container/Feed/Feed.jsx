import React, { Component } from 'react';
import FeedItem from '../../Component/FeedItem/FeedItem';
import FeedNavBar from '../../Component/FeedNavBar/FeedNavBar';
import Axios from '../../Utilities/axios.js';
import './Feed.scss';
import Loading from '../../Component/Loading/Loading';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      sortOrder: 'Most Voted',
      loading: true
    };
  }

  sortChanged = () => {
    this.setState(
      (prevState, props) => {
        if (prevState.sortOrder === 'Most Voted')
          return { sortOrder: 'Created by' };
        else return { sortOrder: 'Most Voted' };
      },
      () => {
        this.sideEffects();
      }
    );
  };

  sideEffects = async () => {
    this.setState({ loading: true });
    const posts = await Axios.get('http://localhost:8080/posts/', {
      params: {
        sort: this.state.sortOrder
      }
    });
    console.log(posts.data);
    this.setState({
      posts: posts.data,
      loading: false
    });
  };

  componentDidMount = async () => {
    try {
      this.sideEffects();
    } catch (err) {
      this.setState({
        posts: []
      });
    }
  };

  render() {
    const { posts, sortOrder, loading } = this.state;
    const feed = posts.map(post => <FeedItem key={post.id} payload={post} />);
    return (
      <div className="feed">
        <FeedNavBar sortOrder={sortOrder} onChange={this.sortChanged} />
        <div className="feed-space">{loading ? <Loading /> : feed}</div>
      </div>
    );
  }
}

export default Feed;
