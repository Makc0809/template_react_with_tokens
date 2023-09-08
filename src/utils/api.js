import axios from 'axios';
import {UserProvider, useUser} from "../contexts/UserContext";

const baseURL = process.env.REACT_APP_API_URL; // Замените на базовый URL вашего API

const axiosInstance = axios.create({
    baseURL,
});

// Функция для установки токена в заголовке Axios
const setApiAuthToken = (token) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
};

// Интерцептор для перехвата ошибок запроса
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            // Обработка ошибки 401 (несуществующий или протухший токен)
            try {
                console.log('response.error', error.config.url);
                if (error.config.url === '/auth/login' || error.config.url === '/auth/register') {
                    return Promise.reject(error.response?.data);
                }
                // console.log('originalRequest', originalRequest?.headers);
                const oldRefreshToken = localStorage.getItem('refreshToken') || null;
                // Здесь вы можете отправить запрос на обновление токена и установить новый токен
                const {accessToken, refreshToken} = await refreshAuthToken(oldRefreshToken);
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                setApiAuthToken(accessToken);
                // Повторите оригинальный запрос с новым токеном
                const originalRequest = error.config;
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Если обновление токена не удалось, выполните дополнительную обработку ошибки
                window.location.replace('/login');
                throw refreshError;
            }
        }
        // Если это не ошибка 401, передайте ошибку дальше
        return Promise.reject(error.response?.data);
    }
);

// Функция для отправки запросов
const sendRequest = async (url, method = 'post', data) => {
    try {
        const response = await axiosInstance({method, url, data});
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Функция для обновления токена (вам нужно реализовать логику обновления)
const refreshAuthToken = async (oldRefreshToken) => {
    try {

        const response = await axiosInstance.post('/auth/refresh-token', {
            oldRefreshToken,
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export {setApiAuthToken, sendRequest};
