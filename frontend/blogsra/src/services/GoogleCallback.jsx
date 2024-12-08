import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoogleCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Extract the token from the URL (you might need to parse the URL fragment for the token)
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token'); // Assuming token is passed as a query parameter

        if (token) {
            // Send the token to the backend
            axios.post('http://localhost:3000/api/v1/auth/google/callback', { token })
                .then((response) => {
                    // Store token and user in localStorage
                    const { token, user } = response.data;
                    localStorage.setItem('user', JSON.stringify(user));  // Store user data
                    localStorage.setItem('token', token);  // Store the JWT token
                    navigate('/home');  // Redirect to the home page
                })
                .catch((error) => {
                    console.error("Error during Google login:", error);
                });
        }
    }, [navigate]);

    return <div>Loading...</div>;  // Optionally, display a loading state while processing the callback
};

export default GoogleCallback;
