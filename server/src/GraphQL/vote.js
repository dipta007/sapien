const { PubSub, withFilter } = require('graphql-subscriptions');

const { gql } = require('apollo-server-express');
const Axios = require('../Axios');

const pubsub = new PubSub();

const typeDefs = gql`
  type Mutation {
    upvote(id: String): Post!
    downvote(id: String): Post!
  }
  type Subscription {
    upvote(postId: String!): Post
    downvote(postId: String!): Post
  }
`;

const resolver = {
  Mutation: {
    upvote: async (_, { id }) => {
      await Axios.post(`/uvote/${id}`);
      const ret = await Axios.post('/graphql', {
        query: `
          query {
            posts(id: "${id}") {
              postid
              upvotes
              downvotes
            }
          }
        `
      });
      await pubsub.publish('upvote', { upvote: ret.data.data.posts[0] });
      return ret.data.data.posts[0];
    },
    downvote: async (_, { id }) => {
      await Axios.post(`/dvote/${id}`);
      const ret = await Axios.post('/graphql', {
        query: `
          query {
            posts(id: "${id}") {
              postid
              upvotes
              downvotes
            }
          }
        `
      });
      await pubsub.publish('downvote', { downvote: ret.data.data.posts[0] });
      return ret.data.data.posts[0];
    }
  },
  Subscription: {
    upvote: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('upvote'),
        (payload, variables) => payload.upvote.postid === variables.postId
      )
    },
    downvote: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('downvote'),
        (payload, variables) => payload.downvote.postid === variables.postId
      )
    }
  }
};
module.exports = {
  voteTypedef: typeDefs,
  voteResolver: resolver
};
