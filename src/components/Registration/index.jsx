import { useNavigate } from "react-router-dom";
import {useState} from "react";
import axios from "axios";

const Registration = () => {
    const [email, setEmail] = useState('test@test.ru');
    const [password, setPassword] = useState('proverka');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        console.log('enter')
        // Отправка запроса на сервер для аутентификации
        try {
            const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, { email, password });

            console.log('data', data);
            // Сохранение токена в localStorage или в состоянии вашего приложения
            // Например, если вы используете Redux, вы можете отправить действие для сохранения токена в хранилище.

            // После сохранения токена, вызовите функцию onLogin, чтобы обновить состояние авторизации.
            // onLogin(token);
        } catch (error) {
            // console.error('Ошибка авторизации:', error);
            if (error?.response?.data?.error) {
                setError(error.response.data.error)
            }
            console.error('Ошибка авторизации:', error.response.data.error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Войти</button>
            {error && <div>{error}</div>}
        </form>
    );
};

export default Registration;