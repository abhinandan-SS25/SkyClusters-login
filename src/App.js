import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
  BrowserRouter,
} from "react-router-dom";
import Login from './login/login';
import Landing from './landing/landing';
import Register from './registration/registration';
import config from './config.json';

const App = () => {
    const [csrf, setCsrf] = React.useState(null);

    const fetchCsrfToken = async () => {
    const response = await fetch(config.API.production + "get_csrf_token", {
            credentials: 'include'
        });
        const data = await response.json();
        setCsrf(data.csrf_token);
    };
    
    React.useEffect(() => {
        fetchCsrfToken();
    }, []);

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<Landing csrf={csrf}/>} exact/>
                <Route path="/login" element={<Login csrf={csrf}/>} exact/>
                <Route path="/register" element={<Register csrf={csrf}/>} exact/>
            </Routes>
        </BrowserRouter>
        
    )
    
};

export default App;