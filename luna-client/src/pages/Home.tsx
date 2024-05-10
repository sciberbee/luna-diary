// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './css/home.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        Welcome to Your Diary!
      </header>
      <div className="button-container">
        <Link to="/login"><button>Login</button></Link>
        <Link to="/register"><button>Register</button></Link>
        <Link to="/diaries"><button>View Diaries</button></Link>
        <Link to="/create-diary"><button>Create Diary</button></Link>
      </div>
      <footer className="home-footer">
        &copy; {new Date().getFullYear()} Your Diary App. All rights reserved.
      </footer>
    </div>
  );
}

export default HomePage;
