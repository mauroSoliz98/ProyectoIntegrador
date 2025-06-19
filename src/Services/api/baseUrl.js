import axios from 'axios';
const baseURL = import.meta.env.VITE_API_LOCAL ;

const api = axios.create({
    baseURL,     
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export default api;