import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { Pie } from 'react-chartjs-2';

const data = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
        {
            label: 'Lessons Completed',
            data: [10, 5, 2], // Replace with dynamic data
            backgroundColor: ['#4caf50', '#ffc107', '#f44336'],
        },
    ],
};

<Pie data={data} />;

const Dashboard = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleEditProfile = () => {
        navigate('/profile'); // Redirect to the Profile page
    };

    return (
        <div className="dashboard">
            {/* Navbar */}
            <nav className="navbar">
                <h1>Polyglot AI</h1>
                <div className="navbar-links">
                    <a href="/">Home</a>
                    <a href="/lessons">Lessons</a>
                    <a href="/chatbot">Chat Bot</a>
                    <a href="/feedbackpage">Feedback</a>
                    <a href="/flashcards">Flashcards</a>
                    <a href="/logout">Logout</a>
                </div>
            </nav>

            {/* Main Content */}
            <div className="dashboard-content">
                {/* Left Sidebar */}
                <aside className="sidebar">
                    <div className="profile-box">
                        <img
                            src="https://via.placeholder.com/100"
                            alt="Profile"
                            className="profile-picture"
                        />
                        <h2>Al Shodiev</h2>
                        <p>@alshodiev01</p>
                        <button
                            className="edit-profile-button"
                            onClick={handleEditProfile} // Redirects when clicked
                        >
                            Edit Profile
                        </button>
                    </div>

                    <div className="sidebar-section">
                        <h3>Languages Practiced</h3>
                        <ul>
                            <li>French: 15 Lessons</li>
                            <li>Spanish: 10 Lessons</li>
                            <li>German: 8 Lessons</li>
                        </ul>
                    </div>

                    <div className="sidebar-section">
                        <h3>Skills</h3>
                        <ul>
                            <li>Vocabulary</li>
                            <li>Grammar</li>
                            <li>Speaking</li>
                        </ul>
                    </div>
                </aside>

                {/* Right Content */}
                <section className="main-content">
                    <div className="stats-box">
                        <div className="pie-chart">
                            <h3>Lessons Completed</h3>
                            <canvas id="pieChart" width="200" height="200"></canvas>
                        </div>
                        <div className="badges">
                            <h3>Badges</h3>
                            <div className="badge-list">
                                <span className="badge">🏆</span>
                                <span className="badge">🔥</span>
                                <span className="badge">📚</span>
                                <span className="badge">🌟</span>
                            </div>
                        </div>
                    </div>

                    <div className="heatmap-box">
                        <h3>Activity Heatmap</h3>
                        <div className="heatmap">
                            {/* Placeholder for heatmap */}
                            <p>[Heatmap Component Goes Here]</p>
                        </div>
                        <div className="heatmap-stats">
                            <p>Total Active Days: <strong>172</strong></p>
                            <p>Max Streak: <strong>41</strong></p>
                        </div>
                    </div>

                    <div className="recent-lessons">
                        <h3>Recent Lessons Completed</h3>
                        <ul>
                            <li>Lesson 1: Vocabulary Basics - 2 days ago</li>
                            <li>Lesson 2: Common Phrases - 4 days ago</li>
                            <li>Lesson 3: Advanced Grammar - 7 days ago</li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
