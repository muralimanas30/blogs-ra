// LoginPrompt.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPrompt = () => {
    const navigate = useNavigate();
    return (
        <div className="ask-login">
            <p>
                Please{' '}
                <button onClick={() => navigate('/login')}>Login</button> to access the blogs.
            </p>
        </div>
    );
};

export default LoginPrompt;