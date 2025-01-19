import React, { useEffect } from 'react';
import Register from '../../components/Register/Register'
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

export default function RegisterPage() {
    const { authToken } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (authToken) {
            navigate('/');  // Redirect to home if the user is already logged in
        }
    }, [authToken, navigate]);  // This ensures the effect runs when `authToken` changes

    return (
        <div className='register-container'>
            <Register />
        </div>
    );
}
