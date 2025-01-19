import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';
import Loader from '../components/Loader/Loader';

const GoogleCallback = () => {
    const navigate = useNavigate();
    const {backend_domain} = useAuthContext()
    useEffect(() => {
        // Extract the token from the URL (you might need to parse the URL fragment for the token)
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token'); // Assuming token is passed as a query parameter

        if (token) {
            // Send the token to the backend
            axios.post(`${backend_domain}/api/v1/auth/google/callback`, { token })
                .then((response) => {
                    // Store token and user in sessionStorage
                    const { token, user } = response.data;
                    sessionStorage.setItem('user', JSON.stringify(user));  // Store user data
                    sessionStorage.setItem('token', token);  // Store the JWT token
                    navigate('/home');  // Redirect to the home page
                })
                .catch((error) => {
                    console.error("Error during Google login:", error);
                });
        }
    }, [navigate]);

    return <Loader/>;  // Optionally, display a loading state while processing the callback
};

export default GoogleCallback;
