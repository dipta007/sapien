const nodeEnv = process.env.NODE_ENV || 'development';
const knexFile = require('./knexfile');
const knex = require('knex')(knexFile[nodeEnv]);

module.exports = knex;
