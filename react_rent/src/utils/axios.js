import axios from 'axios';
import { removeToken } from './auth';

export const axiosAPI = axios.create({
    baseURL: 'http://localhost:8080'
});

// 请求拦截器
axiosAPI.interceptors.request.use((config) => {
    const { url } = config;

    if (
        url.startsWith('/user')
        && !url.startsWith('/user/login')
        && !url.startsWith('/user/registered')
    ) {
        config.headers.Authorization = sessionStorage.getItem('hkzf_token');
    }

    return config;
});

// 响应拦截器
axiosAPI.interceptors.response.use((response) => {
    const { status } = response.data;

    if (status === 400) {
        removeToken();
    }

    return response;
});