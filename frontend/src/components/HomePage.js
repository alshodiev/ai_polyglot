import React from "react";
import  { Link } from 'react-router-dom';
import "./HomePage.css";

const HomePage = () => {
    return (
        <div className="homepage">
            <h1>The free, effective and fun way to learn a language</h1>
            <div className="buttons">
                <Link to="/get-started" className="btn Green">Get Started</Link>
                <Link to="/login" className="btn white">I already have an account</Link>
            </div>
        </div>
    );
};

export default HomePage