import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";
import Login from './login/login';
import Register from './registration/registration';
import config from './config.json';

const App = () => {
    const [csrf, setCsrf] = React.useState(null);

    const fetchCsrfToken = async () => {
    const response = await fetch(config.API.development + "get_csrf_token", {
            credentials: 'include'
        });
        const data = await response.json();
        setCsrf(data.csrf_token);
    };
    fetchCsrfToken();

    return (
        <Routes>
            <Route path="/login" element={<Login csrf={csrf}/>} />
            <Route path="/register" element={<Register csrf={csrf}/>} />
        </Routes>
    )
    
};

export default App;