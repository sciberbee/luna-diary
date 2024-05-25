import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DiaryList from './pages/DiaryList';
import DiaryForm from './pages/DiaryForm';
import HomePage from './pages/Home';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/diaries" element={<DiaryList />} />
        <Route path="/create-diary" element={<DiaryForm />} />
      </Routes>
    </Router>
  );
}

export default App;
