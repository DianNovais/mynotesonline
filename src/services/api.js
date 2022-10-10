import axios from 'axios';

const api = axios.create({
    baseURL: 'https://notes-onlinedi.herokuapp.com'
});

export default api;