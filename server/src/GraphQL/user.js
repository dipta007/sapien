const { gql } = require('apollo-server-express');
const knex = require('../knex');

const typeDefs = gql`
  type User {
    userid: String
    userthumbnail: String
    username: String
  }
  extend type Query {
    authors(username: String): [User!]
  }
`;

const resolver = {
  Query: {
    authors: async (_, { username }) => {
      let data;
      if (username) {
        data = await knex('users')
          .select()
          .where('username', username);
      } else data = await knex('users').select();
      return data;
    }
  }
};
module.exports = {
  userTypedef: typeDefs,
  userResolver: resolver
};
