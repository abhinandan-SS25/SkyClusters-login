import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillCloudsFill } from "react-icons/bs";

function Login(props) {
    return (
        <div>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </div>
    )
}

export default Login;