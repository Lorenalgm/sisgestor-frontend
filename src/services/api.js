import axios from 'axios';
import Cookies from 'js-cookie'

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
    }
})

api.interceptors.response.use(response => {
    return response;
}, (error) => {
    if (error.response.status === 401) {
        Cookies.remove('token')
        alert('Sessão expirada! Faça o login novamente');
    }

    return Promise.reject(error);
})

export default api;