// api/auth.js

import { sendRequest } from "../../utils/api"; // Импортируйте функцию sendRequest из вашего api.js

export const sendLoginRequest = async (email, password) => {
    try {
        // Используйте функцию sendRequest для отправки запроса
        const response = await sendRequest("/auth/login", "post", { email, password });

        if (response) {
            // В случае успешной аутентификации, ожидаем, что сервер вернет токены
            const { accessToken, refreshToken } = response;
            return { accessToken, refreshToken };
        } else {
            throw new Error("Произошла ошибка авторизации");
        }
    } catch (error) {
        throw error;
    }
};
