const Logger = require('logdna');

const options = {
  app: 'ADD_YOUR_API_NAME'
};
const apikey = 'ADD_YOUR_API_KEY';

const logger = Logger.setupDefaultLogger(apikey, options);

module.exports = logger;
