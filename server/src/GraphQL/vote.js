const { gql } = require('apollo-server-express');
const Axios = require('../Axios');

const typeDefs = gql`
  type Mutation {
    upvote(id: String): Post!
    downvote(id: String): Post!
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
      return ret.data.data.posts[0];
    }
  }
};
module.exports = {
  voteTypedef: typeDefs,
  voteResolver: resolver
};
