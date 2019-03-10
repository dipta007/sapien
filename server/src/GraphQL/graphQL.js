const database = require('../knex');
const { ApolloServer, gql } = require('apollo-server-express');
const Axios = require('../Axios');

const typeDefs = gql`
  type Post {
    totalCount: String
    postid: String
    title: String!
    description: String!
    author: User!
    createdat: Float!
    upvotes: Int!
    downvotes: Int!
    media: Media!
  }

  type User {
    userid: String
    userthumbnail: String
    username: String
  }

  type Media {
    mediaid: String!
    mediacover: String
    mediathumbnail: String!
  }

  type Query {
    posts(id: String, orderBy: String, first: Int, offset: Int): [Post!]
  }

  type Mutation {
    upvote(id: String): Post!
    downvote(id: String): Post!
  }
`;

const resolvers = {
  Query: {
    posts: async (_, {
      id, orderBy, first, offset
    }) => {
      let sql = 'select * from posts';
      if (id) sql += ` where postid = '${id}'`;
      if (orderBy) {
        if (orderBy === 'Most Voted') sql += ' order by (upvotes - downvotes) desc';
        else sql += ' natural join users order by username asc';
      }
      if (first) {
        sql += ` limit ${first}`;
      }
      if (offset) {
        sql += ` offset ${offset}`;
      }
      const posts = await database.raw(sql);
      return posts.rows;
    }
  },
  Post: {
    totalCount: async () => {
      const sql = 'select count(*) from posts';
      const res = await database.raw(sql);
      return res.rows[0].count;
    },
    author: async post => {
      const author = await database.raw(
        `select * from users where userid = '${post.userid}'`
      );
      return author.rows[0];
    },
    media: async post => {
      const media = await database.raw(
        `select * from media where mediaid = '${post.mediaid}'`
      );
      return media.rows[0];
    }
  },
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

const server = new ApolloServer({
  typeDefs,
  resolvers
  // mocks: true
});

module.exports = server;
