import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://localhost:7474'
});

export default Axios;
