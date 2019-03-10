const { merge } = require('lodash');
const { ApolloServer } = require('apollo-server-express');

const { postTypedef, postResolver } = require('./post');
const { userTypedef, userResolver } = require('./user');
const { mediaTypedef, mediaResolver } = require('./media');
const { voteTypedef, voteResolver } = require('./vote');

const typeDefs = [postTypedef, userTypedef, mediaTypedef, voteTypedef];

const server = new ApolloServer({
  typeDefs,
  resolvers: merge(mediaResolver, postResolver, voteResolver, userResolver)
  // mocks: true
});

module.exports = server;
