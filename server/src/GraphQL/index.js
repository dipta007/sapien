const express = require('express');
const apolloServer = require('./graphQL');
const { createServer } = require('http');

const app = express();
apolloServer.applyMiddleware({ app });

const httpServer = createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen(7475, () => {
  console.log(
    `🚀 Server ready at http://localhost:7475${apolloServer.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:7475${
      apolloServer.subscriptionsPath
    }`
  );
});

module.exports = app;
