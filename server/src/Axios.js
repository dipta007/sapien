const axios = require('axios');

const Axios = axios.create({
  baseURL: 'http://localhost:7474'
});

module.exports = Axios;
