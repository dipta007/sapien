const express = require('express');
const createPost = require('./createPost');

const app = express();
app.post('/addPost', createPost.addPost);

module.exports = app;
