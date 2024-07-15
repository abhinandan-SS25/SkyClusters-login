import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillCloudsFill } from "react-icons/bs";
import config from '../config.json';

function Login(props) {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const handleEmailChange = (e) => {
        setError("");
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setError("");
        setPassword(e.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        if (email === "" || password === "") {
            setError("Please fill in all fields.");
            setLoading(false);
            return;
        }

        fetch(config.API.production + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': props.csrf
            },
            credentials: 'include',
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            const responseMessage = document.getElementById('responseMessage');
            if (data.msg === 'Successfully logged in.') {
                responseMessage.style.color = 'green';
                setError(data.msg);
            } else {
                responseMessage.style.color = 'red';
                console.log( "Error: " + data.error);
                setError(data.msg);
            }
        })
        .catch(error => {
            console.log( "Error: " + error)
            setError("An error occurred. Please try again later.");
        })
        .finally(() => {
            setLoading(false);
        });

    };

    const loader = <div className='spinner flex'>
        <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>

    return (
        <div className="flex">
            <div className="navbar">
                <Link to="/"><div className='plt_logo'><BsFillCloudsFill size={80} color='blue'/> SkyClusters</div></Link>
                <span className="active">Login to your SkyClusters Account</span>
                <span>Don't have an account with us yet? <Link to="/register">Register</Link></span>
            </div>
            <div className="banner">
                <div className="banner-content">
                    Provision Multi-Cloud Clusters. Deploy Software and Workloads at Scale.
                    <img src="/media/Multi-Cloud-Monitoring-Hero-Graphic+600x500-2x.png" alt="Banner" />
                </div>
            </div>
            <div className="login-container">
                <p id="responseMessage">{error}</p>
                    <form id="loginForm">
                        <label for="email">Enter your registered email.</label>
                        <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} required />
                        <label for="password">Enter your account password.</label>
                        <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} required />
                        {loading? loader: <button type="submit" onClick={handleSubmit} disabled={loading}>Login</button>}
                    </form>
            </div>
        </div>
    );
}

export default Login;