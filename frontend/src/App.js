import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import GetStarted from './components/GetStarted';
import Login from './components/Login';
import LessonList from './components/LessonList';
import Profile from './components/Profile.js';
import Dashboard from './components/Dashboard';
import Practice from './components/Practice.js';
import PrivateRoute from './components/PrivateRoute';
import FeedbackPage from './components/FeedbackPage.js';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem('accessToken') // Check if token exists in localStorage
    );

    const handleLoginSuccess = () => {
        setIsLoggedIn(true); // Update state to reflect login
    };

    const handleLogout = () => {
      localStorage.removeItem('accessToken'); // Clear token from storage
      setIsLoggedIn(false); // Update state to reflect logout
  };

    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/login"
                    element={
                       isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLoginSuccess={handleLoginSuccess} />
                    }
                />
                <Route path="/get-started" element={<GetStarted />} />

                {/* Private Routes */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/lessons"
                    element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <LessonList onLogout={handleLogout} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <Profile onLogout={handleLogout} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/practice"
                    element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <Practice />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/feedback"
                    elements={
                        <PrivateRoute isLoggedin={isLoggedIn}>
                            < FeedbackPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
