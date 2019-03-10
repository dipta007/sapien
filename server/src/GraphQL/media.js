const { gql } = require('apollo-server-express');
const uuidv4 = require('uuid/v4');
const knex = require('../knex');

const typeDefs = gql`
  type Media {
    mediaid: String!
    mediacover: String
    mediathumbnail: String!
  }
  extend type Mutation {
    addMedia(thumbUrl: String, coverUrl: String): String!
  }
`;

const resolver = {
  Mutation: {
    addMedia: async (_, { thumbUrl, coverUrl }) => {
      const id = uuidv4();
      let sql = `INSERT into media (mediaid, mediathumbnail) values ('${id}', '${thumbUrl}')`;
      if (coverUrl) {
        sql = `INSERT into media (mediaid, mediacover, mediathumbnail) values ('${id}', '${coverUrl}', '${thumbUrl}')`;
      }
      try {
        await knex.raw(sql);
        return id;
      } catch (err) {
        console.log(err);
        return null;
      }
    }
  }
};
module.exports = {
  mediaTypedef: typeDefs,
  mediaResolver: resolver
};
