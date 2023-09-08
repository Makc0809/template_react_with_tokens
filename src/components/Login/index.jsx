import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {useUser} from "../../contexts/UserContext";
import {sendRequest} from "../../utils/api";
import {sendLoginRequest} from "../../api/auth/login";
import "./index.scss";
import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";


const Login = () => {
    const [email, setEmail] = useState('test@test.ru');
    const [password, setPassword] = useState('proverka');
    const [error, setError] = useState('');
    const {updateTokens} = useUser();
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        // Отправка запроса на сервер для аутентификации
        try {
            const {accessToken, refreshToken} = await sendLoginRequest(email, password);
            updateTokens(accessToken, refreshToken);
            navigate("/", {replace: true});


            // onLogin(token);
        } catch (error) {
            // console.error('Ошибка авторизации:', error);
            setError(error.message || "Произошла ошибка авторизации");

        }
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center h-100">
            <Form className="login-form" onSubmit={handleLogin}>
                <h2>Вход</h2>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Введите ваш email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Введите ваш пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                    Войти
                </Button>
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Form>
        </Container>
    );
};

export default Login;