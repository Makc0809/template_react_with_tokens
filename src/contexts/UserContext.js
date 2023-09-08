import { createContext, useState, useContext } from "react";
import {setApiAuthToken} from "../utils/api";

// Создаем контекст
export const UserContext = createContext();

// Создаем провайдер контекста
export function UserProvider({ children }) {
    // Состояния для хранения информации о пользователе и настроек
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || null);
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken") || 'test');
    const [language, setLanguage] = useState(localStorage.getItem("language") || "en"); // По умолчанию английский
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light"); // По умолчанию светлая тема

    // Функция для обновления токенов
    const updateTokens = (newAccessToken, newRefreshToken) => {
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        setApiAuthToken(newAccessToken);
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
    };

    // Функция для обновления настроек
    const updateSettings = (newLanguage, newTheme) => {
        setLanguage(newLanguage);
        setTheme(newTheme);
        localStorage.setItem("language", newLanguage);
        localStorage.setItem("theme", newTheme);
    };

    // Значение контекста
    const contextValue = {
        user,
        setUser,
        accessToken,
        refreshToken,
        updateTokens,
        language,
        theme,
        updateSettings,
    };

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
}

// Создаем хук для использования контекста
export function useUser() {
    return useContext(UserContext);
}
