import axios from 'axios';

const api = axios.create({
  baseURL: 'http://callforcodeclimate2020.mybluemix.net',
});

export default api;
