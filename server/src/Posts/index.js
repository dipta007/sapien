const express = require('express');
const post = require('./post');

const app = express();
app.get('/posts', post.getAll);
app.get('/post/:postId', post.getPost);
app.post('/uvote/:postId', post.upvote);
app.post('/dvote/:postId', post.downvote);

module.exports = app;
