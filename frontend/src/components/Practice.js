import React, { useState } from 'react';
import './Practice.css';
import DashboardPage from './Practice/DashboardPage';
import Listening from './Practice/Listening';
import Reading from './Practice/Reading';
import Writing from './Practice/Writing';
import Speaking from './Practice/Speaking';

const PracticePage = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <h2>Practice Areas</h2>
                <ul className="nav-tabs">
                    {['dashboard', 'listening', 'reading', 'writing', 'speaking'].map((tab) => (
                        <li key={tab}>
                            <button
                                className={`tab-link ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => handleTabClick(tab)}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>
            <main className="content">
                {activeTab === 'dashboard' && <DashboardPage />}
                {activeTab === 'listening' && <Listening />}
                {activeTab === 'reading' && <Reading />}
                {activeTab === 'writing' && <Writing />}
                {activeTab === 'speaking' && <Speaking />}
            </main>
        </div>
    );
};

export default PracticePage;
