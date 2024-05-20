// src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUsername, logout } from '../api';
import './css/home.css';

const HomePage: React.FC = () => {
  const [username, setUsername] = useState<string>('');

  const readUsername = async () => {
    try {
      const response = await getUsername();
      console.log(response);
      setUsername(response.data.username);
    } catch (error) {
      console.error('Failed to fetch username:', error);
    }
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      setUsername('');
      alert('Successfully logged out!');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  }

  useEffect(() => {
    readUsername();
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        Welcome to Luna diary!
      </header>
      <header className="username-header">
        {username ? <p>You are logged in as <b>{username}</b></p> : <p>You are not logged in...</p>}
      </header>
      <div className="button-container">
        {!username ? (
          <>
            <Link to="/login"><button>Login</button></Link>
            <Link to="/register"><button>Register</button></Link>
          </>
        ) : (
          <>
            <button onClick={handleLogout}>Logout</button>
            <Link to="/diaries"><button>View Diaries</button></Link>
            <Link to="/create-diary"><button>Create Diary</button></Link>
          </>
        )}
      </div>
      <footer className="home-footer">
        &copy; {new Date().getFullYear()} Seunghyeon Bang, cyber@SPARCS.
      </footer>
    </div>
  );
}

export default HomePage;
