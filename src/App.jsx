import React, {useEffect} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom'; // Используем Routes вместо Route
import Home from './components/Dashboard';
import Login from './components/Login';
import ProfilePage from './components/Profile';
import PrivateRoute from "./routes/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Registration from "./components/Registration";
import Header from "./components/Header";
import {useUser} from "./contexts/UserContext";
import {Container} from "react-bootstrap";


const App = () => {
    const {accessToken} = useUser();

    return (
        <Container fluid className="p-0">
            <Header accessToken={accessToken}/> {/* Передаем accessToken в Header */}
            <Routes>


                {/*<Route path="/" element={<Home />} />*/}
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/login" element={<Login/>}/>
                {/* Private Route */}
                <Route
                    path="/"
                    element={
                        <PrivateRoute isAuthenticated={!!accessToken}>
                            <Dashboard/>
                        </PrivateRoute>
                    }
                />
                {/*<Route path="*" element={<NotFound />} />*/}
            </Routes>
        </Container>

    );
};

export default App;