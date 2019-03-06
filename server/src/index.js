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

const server = app.listen(8080, () => {
  const host = server.address().address;
  const { port } = server.address();
  console.log('Listening on ', host, port);
});

// All the external routes
const post = require('./Posts/index');
const createPost = require('./CreatePost/index');
const fileUpload = require('./FileUplaod/index');

app.use(post);
app.use(createPost);
app.use(fileUpload);
