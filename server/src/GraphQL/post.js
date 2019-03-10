const { gql } = require('apollo-server-express');
const knex = require('../knex');
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
  type Query {
    posts(id: String, orderBy: String, first: Int, offset: Int): [Post!]
  }
  extend type Mutation {
    addPost(
      postid: String
      title: String
      description: String
      author: String
      createdat: Float
      upvotes: Int
      downvotes: Int
      mediaid: String
    ): Post!

    deletePost(postid: String): String!
  }
`;

const resolver = {
  Post: {
    totalCount: async () => {
      const sql = 'select count(*) from posts';
      const res = await knex.raw(sql);
      return res.rows[0].count;
    },
    author: async post => {
      const author = await knex.raw(
        `select * from users where userid = '${post.userid}'`
      );
      return author.rows[0];
    },
    media: async post => {
      const media = await knex.raw(
        `select * from media where mediaid = '${post.mediaid}'`
      );
      return media.rows[0];
    }
  },
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
      const posts = await knex.raw(sql);
      return posts.rows;
    }
  },
  Mutation: {
    addPost: async (
      _,
      {
        postid,
        title,
        description,
        author,
        createdat,
        upvotes,
        downvotes,
        mediaid
      }
    ) => {
      const sql = `INSERT INTO posts (postid, title, description, userid, createdat, upvotes, downvotes, mediaid) values
                ('${postid}', '${title}', '${description}', '${author}', '${createdat}',${upvotes}, ${downvotes}, '${mediaid}')`;
      await knex.raw(sql);
      const ret = await Axios.post('/graphql', {
        query: `
          query {
            posts(id: "${postid}") {
              postid
            }
          }
        `
      });

      return ret.data.data.posts[0];
    },

    deletePost: async (_, { postid }) => {
      const sql = `delete from posts where postid = '${postid}'`;
      await knex.raw(sql);
      return postid;
    }
  }
};

module.exports = {
  postTypedef: typeDefs,
  postResolver: resolver
};
