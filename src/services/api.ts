import axios from 'axios';

const api = axios.create({
    baseURL: '',
    //insert backend API url.
})

export default api;