import React, { useEffect, useState } from 'react';

const LessonList = ({ onLogout }) => {
    const [lessons, setLessons] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/lessons/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch lessons. Status: ${response.status}`);
                }

                const data = await response.json();
                setLessons(data);
            } catch (err) {
                console.error("Error fetching lessons:", err.message);
                setError("Failed to fetch lessons. Please try again later.");
            }
        };

        fetchLessons();
    }, []);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            {/* Logout Button */}
            <button
                onClick={onLogout}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#ff4c4c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginBottom: '20px',
                }}
            >
                Logout
            </button>

            <h1>Lessons</h1>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {lessons.map((lesson) => (
                    <li key={lesson.id} style={{ marginBottom: '20px', textAlign: 'left' }}>
                        <h2>{lesson.title}</h2>
                        <p>{lesson.content}</p>
                        <p>
                            <strong>Language:</strong> {lesson.language}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LessonList;
