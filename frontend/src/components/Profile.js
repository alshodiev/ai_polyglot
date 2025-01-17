import React from 'react';

const Profile = ({ onLogout }) => {
    const username = localStorage.getItem('username') || 'Guest';

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>User Profile</h1>
            <p><strong>Username:</strong> {username}</p>
            <button
                onClick={onLogout}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#ff4c4c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Logout
            </button>
        </div>
    );
};

export default Profile;