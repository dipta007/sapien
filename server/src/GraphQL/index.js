const express = require('express');
const server = require('./graphQL');

const app = express();
server.applyMiddleware({ app });

module.exports = app;
