import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, Alert } from 'reactstrap';
import './AddPost.scss';
import Editor from '../../Component/Editor/Editor';
import ImageUpload from '../../Component/ImageUpload/ImageUpload';
import Axios from './../../Utilities/axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
const uuidv4 = require('uuid/v4');

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      titleError: 0,
      covers: [],
      thumbError: 0,
      thumbnails: [],
      descriptionError: 0,
      description: '',
      submitButtonDisabled: false
    };
  }

  titleChange = e => {
    this.setState({
      title: e.target.value,
      titleError: 1
    });
  };
  coverChange = file => {
    this.setState({
      covers: file
    });
  };
  thumbnailChange = file => {
    this.setState({
      thumbnails: file,
      thumbError: 1
    });
  };
  descriptionChange = desc => {
    this.setState({
      description: desc,
      descriptionError: 1
    });
  };
  addPost = async () => {
    this.setState({
      titleError: 1,
      thumbError: 1,
      descriptionError: 1
    });
    if (
      this.state.title.length &&
      this.state.description.length &&
      this.state.thumbnails.length
    ) {
      this.setState({
        submitButtonDisabled: true
      });

      let data = new FormData();
      data.append('file', this.state.thumbnails[0]);
      if (this.state.covers.length) data.append('file', this.state.covers[0]);

      const payload = await Axios.post('/addMedia', data);
      const mediaId = payload.data;

      let author = await Axios.post('/graphql', {
        query: `
          query {
            authors(username: "${this.props.username}") {
              username
              userid
            }
          }
        `
      });

      author = author.data.data.authors[0].userid;

      const postId = uuidv4();
      await Axios.post('/graphql', {
        query: `
          mutation addPost {
            addPost(postid: "${postId}", title: "${this.state.title}", 
            description: "${this.state.description}", author: "${author}", 
            createdat: ${Date.now()}, upvotes: 0, downvotes: 0, mediaid: "${mediaId}") {
              postid
            }
          } 
        `
      });

      this.props.history.push('/posts');
    }
  };

  render() {
    const {
      title,
      titleError,
      thumbError,
      descriptionError,
      submitButtonDisabled
    } = this.state;
    return (
      <div className="post-form">
        <div className="breadcrumb">Create your post here</div>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input type="text" onChange={this.titleChange} />
          {titleError && !title.length ? (
            <Alert style={{ marginTop: '10px' }} color="danger">
              Title can't be empty
            </Alert>
          ) : null}
        </FormGroup>

        <Editor
          onChange={this.descriptionChange}
          submitted={!!descriptionError}
        />

        <ImageUpload
          onChange={this.coverChange}
          required={false}
          label="Cover"
        />

        <ImageUpload
          onChange={this.thumbnailChange}
          required={true}
          alertMessage="Thumbnail must be added"
          submitted={!!thumbError}
          label="Thumbnail"
        />

        <Button
          color="success"
          block
          onClick={this.addPost}
          style={{ marginTop: '20px' }}
          disabled={submitButtonDisabled}
        >
          Add Post
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.username
  };
};

export default connect(
  mapStateToProps,
  null
)(withRouter(AddPost));
