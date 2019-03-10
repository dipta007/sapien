const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    userid: String
    userthumbnail: String
    username: String
  }
`;
module.exports = {
  userTypedef: typeDefs
};
