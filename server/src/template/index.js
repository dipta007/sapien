const express = require('express');
const temp = require('./temp');

const app = express();
app.get('/temp', temp.logIn);

module.exports = app;
