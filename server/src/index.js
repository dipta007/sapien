// All the common middlewares to use for all APIs
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('okk');
});

const server = app.listen(7474, () => {
  const host = server.address().address;
  const { port } = server.address();
  console.log('Listening on ', host, port);
});

// All the external routes
const post = require('./Posts/index');
const fileUpload = require('./FileUplaod/index');
const graphQL = require('./GraphQL/index');

app.use(post);
app.use(fileUpload);
app.use(graphQL);
