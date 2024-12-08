import React, { useState, useCallback } from 'react'; // Use memoized callback to prevent unnecessary re-renders
import './Register.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { FaGoogle, FaApple } from 'react-icons/fa';
import { useGoogleLogin } from '@react-oauth/google';

const Register = () => {
    // State to manage input values and error messages
    const [username, setUsername] = useState(''); // Added username state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); // Hook to navigate between routes
    const { login } = useAuthContext(); // Use the login function from AuthContext

    // Memoized handleSubmit to avoid unnecessary re-renders
    const registerWithGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {

                // Pass the ID Token to the backend
                const res = await axios.post('http://localhost:3000/api/v1/auth/google/callback', {
                    token: tokenResponse.access_token, // ID Token from Google response
                });
                console.log('Backend Response:', res.data);
                const { token, user } = res.data;
    
                // Save token and user info
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', token);
                login(token);
                navigate('/home'); // Navigate to home on success
            } catch (error) {
                console.error("Error logging in with Google:", error.response?.data || error.message);
                setErrorMessage('Google login failed. Please try again.');
            }
        },
        onError: (error) => {
            console.error('Google login error:', error);
            setErrorMessage('Google login error. Please try again.');
        },
    });

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setIsLoading(true); // Set loading state to true while the request is being made
        setErrorMessage(''); // Clear previous error messages

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        try {
            // Make the API request to register the user
            const response = await axios.post('http://localhost:3000/api/v1/auth/register', { name:username, email, password });

            const { user, token, message } = response.data; // Destructure response from backend

            // Store the token and user data in localStorage and in AuthContext
            login(token); // Store token in AuthContext
            localStorage.setItem('user', JSON.stringify(user)); // Store user data in localStorage

            console.log('Registration successful:', message); // Log success message
            navigate('/home');  // Redirect to home page after successful registration
        } catch (err) {
            // Handle any error from the API request
            console.log(err.response?.data?.message || err);
            setErrorMessage(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false); // Reset loading state once the request is done
        }
    }, [username, email, password, confirmPassword, login, navigate]);

    return (
        <div className="register-container-content">
            <h1 className="company-name">BlogsRa</h1>
            {/* Display error message if there's any */}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            {/* Social login buttons */}
            <div className="social-login">
                <button className="google-login" type="button" onClick={registerWithGoogle}>
                    Google <FaGoogle />
                </button>
                <button className="apple-login" type="button">
                    Apple <FaApple />
                </button>
            </div>
            <div className="divider"></div> {/* Horizontal line */}

            {/* Registration form */}
            <form method="post" onSubmit={handleSubmit}>
                {/* Username input */}
                <div className="usrbox">
                    <label htmlFor="username-input">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} // Update username state
                        placeholder="Enter your username"
                        required
                    />
                </div>

                {/* Email input */}
                <div className="usrbox">
                    <label htmlFor="email-input">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Update email state
                        placeholder="Enter your email"
                        required
                    />
                </div>

                {/* Password input */}
                <div className="passwordbox">
                    <label htmlFor="password-input">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update password state
                        placeholder="Enter your password"
                        required
                    />
                </div>

                {/* Confirm Password input */}
                <div className="passwordbox">
                    <label htmlFor="confirm-password-input">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state
                        placeholder="Confirm your password"
                        required
                    />
                </div>

                {/* Submit button */}
                <div className="submit-box">
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </div>
            </form>

            {/* Login link to navigate to the login page */}
            <div className="login-box">
                <p className="login-above">Already have an account? Login below</p>
                <Link to="/login">
                    <button className="login-button" type="button">
                        LOGIN
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Register;
