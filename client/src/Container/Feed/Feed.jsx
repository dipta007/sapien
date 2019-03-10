import React, { Component } from 'react';
import FeedItem from '../../Component/FeedItem/FeedItem';
import FeedNavBar from '../../Component/FeedNavBar/FeedNavBar';
import Axios from '../../Utilities/axios.js';
import './Feed.scss';
import Loading from '../../Component/Loading/Loading';
import ReactPaginate from 'react-paginate';

const PAGE_LIMIT = 5;

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      sortOrder: 'Most Voted',
      loading: true,
      total: 0,
      selectedPage: 0
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
        this.getData(
          this.state.sortOrder,
          PAGE_LIMIT,
          this.state.selectedPage * PAGE_LIMIT
        );
      }
    );
  };

  sideEffects = async () => {
    const posts = await Axios.get('/posts/', {
      params: {
        sort: this.state.sortOrder
      }
    });

    const graph = await Axios.post('/graphql', {
      query: `
        query {
          posts(orderBy: "Most Voted") {
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
    console.log(graph.data.data.posts, posts.data);
    this.setState({
      posts: posts.data,
      loading: false
    });
  };

  componentDidMount = async () => {
    try {
      this.getData(this.state.sortOrder, PAGE_LIMIT, 0);
    } catch (err) {
      this.setState({
        posts: []
      });
    }
  };

  getData = async (sortOrder, limit, offset) => {
    console.log(sortOrder, limit, offset);
    this.setState({ loading: true });
    const graph = await Axios.post('/graphql', {
      query: `
        query {
          posts(orderBy: "${sortOrder}", first: ${limit}, offset: ${offset}) {
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

    this.setState({
      posts: graph.data.data.posts,
      loading: false,
      total: graph.data.data.posts.length
        ? graph.data.data.posts[0].totalCount
        : 0
    });
  };

  handlePageClick = async e => {
    const selectedPage = e.selected;
    this.setState({
      selectedPage: selectedPage
    });
    const offset = selectedPage * PAGE_LIMIT;
    this.getData(this.state.sortOrder, PAGE_LIMIT, offset);
  };

  render() {
    const { posts, sortOrder, loading, total } = this.state;
    const feed = posts.map(post => (
      <FeedItem key={post.postid} payload={post} />
    ));
    return (
      <div className="feed">
        <FeedNavBar sortOrder={sortOrder} onChange={this.sortChanged} />
        {this.state.loading ? null : (
          <div id="react-paginate">
            <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={Math.ceil(total / PAGE_LIMIT)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            />
          </div>
        )}
        <div className="feed-space">{loading ? <Loading /> : feed}</div>
      </div>
    );
  }
}

export default Feed;
