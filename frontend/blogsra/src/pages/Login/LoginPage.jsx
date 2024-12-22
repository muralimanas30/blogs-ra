import React, { useEffect } from 'react';
import Login from '../../components/Login/Login';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
    const { authToken } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (authToken) {
            navigate('/');
        }
    }, [authToken, navigate]); // Add authToken and navigate as dependencies

    return (
        <div className="login-container">
            <Login />
        </div>
    );
}
