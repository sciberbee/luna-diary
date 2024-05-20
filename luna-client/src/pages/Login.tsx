// src/pages/Login.tsx
import React, { useState } from 'react';
import { login } from '../api'; // Ensure the API function exists and is correctly imported
import './css/login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      alert('Login successful!');
      alert('Welcome, ' + username + '!');
      // redirection to Home page
        window.location.href = '/';
    } catch (error) {
      alert('Login failed!');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-header">Login to Luna</h1>
      <form onSubmit={handleLogin}>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
