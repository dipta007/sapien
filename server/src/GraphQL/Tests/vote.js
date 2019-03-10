const Axios = require('../../Axios');
const uuidv4 = require('uuid/v4');
const chai = require('chai');

chai.should();

describe('/UPVOTE /DOWNVOTE', () => {
  it('will check the whole voting flow', async () => {
    const id = uuidv4();
    const upvotes = 100;
    const downvotes = 150;
    let postId = await Axios.post('/graphql', {
      query: `
                mutation addPost{
                    addPost(postid: "${id}", title: "check", description: "check d", author: "1", upvotes: ${upvotes}, downvotes: ${downvotes}, mediaid: "1", createdat: 1551890000000) {
                        postid
                    }
                }
            `
    });
    postId = postId.data.data.addPost;
    postId.should.be.a('object');
    postId = postId.postid;
    postId.should.be.eql(id);

    const post = await Axios.post('/graphql', {
      query: `
                query {
                    posts(id: "${postId}") {
                        upvotes
                        downvotes
                    }
                }
            `
    });

    const getUpvotes = post.data.data.posts[0].upvotes;
    const getDownvotes = post.data.data.posts[0].downvotes;

    let nowVotes = await Axios.post('/graphql', {
      query: `
                mutation upvote {
                    upvote(id: "${postId}") {
                        postid
                        upvotes
                        downvotes
                    }
                }
            `
    });
    nowVotes = nowVotes.data.data.upvote;
    nowVotes.should.be.a('object');
    nowVotes.upvotes.should.be.eql(getUpvotes + 1);

    nowVotes = await Axios.post('/graphql', {
      query: `
                mutation downvote {
                    downvote(id: "${postId}") {
                        postid
                        upvotes
                        downvotes
                    }
                }
            `
    });
    nowVotes = nowVotes.data.data.downvote;
    nowVotes.should.be.a('object');
    nowVotes.downvotes.should.be.eql(getDownvotes + 1);

    let deletedId = await Axios.post('/graphql', {
      query: `
        mutation {
            deletePost(postid: "${postId}")
        }
        `
    });
    deletedId = deletedId.data.data.deletePost;

    deletedId.should.be.eql(postId);
  });
});
