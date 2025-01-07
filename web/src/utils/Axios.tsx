import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  withCredentials: true,
});

export default Axios;
