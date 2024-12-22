import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };

    return (
        <div className="not-found">
            <div className="not-found__overlay"></div>
            <div className="not-found__content">
                <h1 className="not-found__title">404</h1>
                <p className="not-found__message">Oops! The page you’re looking for doesn’t exist.</p>
                <button className="not-found__button" onClick={goToHome}>
                    Go Back Home
                </button>
            </div>
        </div>
    );
};

export default NotFound;
