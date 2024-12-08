import React from 'react';
import  Register from '../../components/Register/Register'
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

export default function RegisterPage() {
    const { authToken } = useAuthContext();
    const navigate = useNavigate();

    if (authToken) navigate('/');  // Redirect to home if the user is already logged in

    return (
        <div className='register-container'>
            <Register />
        </div>
    );
}
