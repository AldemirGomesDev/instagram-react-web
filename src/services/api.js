import axios from 'axios';

const api = axios.create({
    baseURL: 'https://instarocket-back-end.herokuapp.com',
});

export default api;