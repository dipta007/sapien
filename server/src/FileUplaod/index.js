const express = require('express');
const fileUploader = require('express-fileupload');
const fileUpload = require('./fileUpload');

const app = express();
app.use(fileUploader());
app.post('/addMedia', fileUpload.fileUp);

module.exports = app;
