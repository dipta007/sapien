const Axios = require('../../Axios');
const uuidv4 = require('uuid/v4');
const chai = require('chai');

chai.should();

describe('/INSERT/DELETE/GET posts', () => {
  it('will check the whole post flow', async () => {
    const id = uuidv4();
    const title = 'check';
    const description = 'check d';
    const upvotes = 100;
    const downvotes = 150;
    const author = '1';
    const mediaId = '1';
    const createdAt = 1551890000000;
    let post = await Axios.post('/graphql', {
      query: `
                mutation addPost{
                    addPost(postid: "${id}", title: "${title}", description: "${description}", author: "${author}", upvotes: ${upvotes}, downvotes: ${downvotes}, mediaid: "${mediaId}", createdat: ${createdAt}) {
                        postid
                    }
                }
            `
    });
    post = post.data.data.addPost;
    post.should.be.a('object');
    const postId = post.postid;

    post = await Axios.post('/graphql', {
      query: `
            query {
                posts(id: "${postId}") {
                    postid
                    title
                    description
                    upvotes
                    downvotes
                    createdat
                }
            }
          `
    });

    post = post.data.data.posts;
    post.should.be.a('array');
    [post] = post;

    post.should.be.a('object');
    post.postid.should.be.eql(id);
    post.title.should.be.eql(title);
    post.description.should.be.eql(description);
    post.upvotes.should.be.eql(upvotes);
    post.downvotes.should.be.eql(downvotes);
    post.createdat.should.be.eql(createdAt);

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
