const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const server = require('./graphQL');

const app = express();
server.applyMiddleware({ app });
// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// app.use(
//   '/graphiql',
//   graphiqlExpress({
//     endpointURL: '/graphql'
//   })
// );

module.exports = app;
