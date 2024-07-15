import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillCloudsFill } from "react-icons/bs";

function Registration() {

    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setCPassword] = React.useState("");
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
    const handleUsernameChange = (e) => {
        setError("");
        setUsername(e.target.value);
    };
    const handleCPasswordChange = (e) => {
        setError("");
        setCPassword(e.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        if (email === "" || password === "" || username === "" || confirmPassword === "") {
            setError("Please fill in all fields.");
            setLoading(false);
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        fetch(config.API.production + 'register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': props.csrf
            },
            credentials: 'include',
            body: JSON.stringify({
                email: email,
                password: password,
                username: username,
                comfirm_password: confirmPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            const responseMessage = document.getElementById('responseMessage');
            if (data.msg === 'Successfully registered for account.') {
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


    return (
        <div className="flex">
            <div className="navbar flex">
            <Link to="/"><div className='plt_logo'><BsFillCloudsFill size={80} color='blue'/> SkyClusters</div></Link>
                <span className="active">Register for your SkyClusters Account</span>
                <span>Already have an account with us? <Link to="/login">Login</Link></span>
            </div>
            <div className="banner">
                <div className="banner-content">
                    Get complete control over your cloud resources. Get the power of all the clouds at your fingertips.
                    <img src="/media/63a36af595e165d119759056_multicloud-diagram-01-1200x879.png" alt="Banner" />
                </div>
            </div>
            <div className="login-container">
                <p id="responseMessage">Error</p>
                <form id="loginForm">
                    <label for="username">Choose a username.</label>
                    <input type="text" id="username" name="username" required value={username} onChange={handleUsernameChange} />
                    <label for="email">Enter your email address.</label>
                    <input type="email" id="email" name="email" required value={email} onChange={handleEmailChange} />
                    <label for="password">Enter your account password.</label>
                    <input type="password" id="password" name="password" required value={password} onChange={handlePasswordChange} />
                    <label for="password">Confirm the provided password.</label>
                    <input type="password" id="password" name="password" required value={confirmPassword} onChange={handleCPasswordChange} />
                    {loading? loader: <button type="submit" onClick={handleSubmit} disabled={loading}>Register</button>}
                </form>
            </div>
        </div>
    );
}

export default Registration;