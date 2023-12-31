import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from "react-router-dom";
import {UserProvider} from "./contexts/UserContext";
import "./index.scss"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <UserProvider>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </UserProvider>
    </BrowserRouter>
);

