const express = require('express');
const post = require('./post');

const app = express();
app.post('/uvote/:postId', post.upvote);
app.post('/dvote/:postId', post.downvote);

module.exports = app;
