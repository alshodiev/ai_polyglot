import React, { useEffect, useState } from 'react';

const LessonList = () => {
    const [lessons, setLessons] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await fetch('http://127.0.0.1:8000/api/lessons/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch lessons');
                }

                const data = await response.json();
                setLessons(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchLessons();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Lessons</h1>
            <ul>
                {lessons.map((lesson) => (
                    <li key={lesson.id}>
                        <h2>{lesson.title}</h2>
                        <p>{lesson.content}</p>
                        <p><strong>Language:</strong> {lesson.language}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LessonList;
