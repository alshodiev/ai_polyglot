import React from 'react';
import './DashboardPage.css';

const Dashboard = () => {
    const progressData = [
        { label: 'Listening', progress: 70 },
        { label: 'Reading', progress: 50 },
        { label: 'Writing', progress: 80 },
        { label: 'Speaking', progress: 60 },
    ];

    return (
        <div className="dashboard">
            <header>
                <h1>Welcome to Your Practice Dashboard</h1>
                <p>Track your progress below.</p>
            </header>
            <section className="progress-section">
                <h2>Your Weekly Progress</h2>
                <div className="progress-bars">
                    {progressData.map((item, index) => (
                        <div className="progress-bar" key={index}>
                            <span className="label">{item.label}</span>
                            <div className="bar-container">
                                <div
                                    className="bar"
                                    style={{ width: `${item.progress}%` }}
                                >
                                    {item.progress}%
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
