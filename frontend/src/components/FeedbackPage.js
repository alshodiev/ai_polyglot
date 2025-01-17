import React from 'react';
import './FeedbackPage.css';

const FeedbackPage = () => {
    const currentGoals = [
        'Complete 10 vocabulary lessons this week.',
        'Practice speaking for 15 minutes daily.',
        'Achieve a 7-day streak on lessons.',
    ];

    const feedback = [
        'Great job maintaining your streak! Keep it up!',
        'You’re doing well with vocabulary, but try practicing grammar lessons to balance your learning.',
        'Your speaking practice is improving, but consistency is key. Aim for daily practice.',
    ];

    return (
        <div className="feedback-page">
            <h1>Feedback and Goals</h1>

            {/* Current Goals Section */}
            <section className="goals-section">
                <h2>Current Goals</h2>
                <ul>
                    {currentGoals.map((goal, index) => (
                        <li key={index}>{goal}</li>
                    ))}
                </ul>
            </section>

            {/* Feedback Section */}
            <section className="feedback-section">
                <h2>AI-Generated Feedback</h2>
                <ul>
                    {feedback.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default FeedbackPage;
