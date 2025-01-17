import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (username.trim() && password.trim()) {
            // Simulate saving a token to localStorage
            localStorage.setItem('accessToken', `${username}-mock-token`);
            localStorage.setItem('username', username); // Save username
            onLoginSuccess(); // Notify parent App.js that the user has logged in
            navigate('/dashboard'); // Redirect to the dashboard
        } else {
            setError('Username and password cannot be empty');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Login</h1>
            <form onSubmit={handleLogin} style={{ maxWidth: '300px', margin: '0 auto' }}>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            padding: '10px',
                            marginBottom: '10px',
                            width: '100%',
                            boxSizing: 'border-box',
                        }}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            padding: '10px',
                            marginBottom: '10px',
                            width: '100%',
                            boxSizing: 'border-box',
                        }}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#4caf50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
