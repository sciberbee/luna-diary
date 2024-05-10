// src/pages/Register.tsx
import React, { useState } from 'react';
import { register } from '../api'; // Ensure the API function exists and is correctly imported
import './css/register.css';

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await register(username, password);
      alert('Registration successful!');
    } catch (error) {
      alert('Registration failed!');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister}>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
    </div>
    );
}

export default Register;
