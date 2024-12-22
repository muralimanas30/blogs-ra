import React, { useState, useCallback } from 'react'; // Use memoized callback to prevent unnecessary re-renders
import './Register.css';
import axios from 'axios'; // For API requests
import { Link, useNavigate } from 'react-router-dom'; // Routing utilities
import { useAuthContext } from '../../context/AuthContext'; // Auth context for managing login state
import { FaGoogle, FaApple } from 'react-icons/fa'; // Icons
import { useGoogleLogin } from '@react-oauth/google'; // Google login hook

const Register = () => {
    const { login, backend_domain, createAccount } = useAuthContext(); // Context for login and backend domain
    const [username, setUsername] = useState(''); // Username state
    const [email, setEmail] = useState(''); // Email state
    const [password, setPassword] = useState(''); // Password state
    const [confirmPassword, setConfirmPassword] = useState(''); // Confirm password state
    const [errorMessage, setErrorMessage] = useState(''); // Error message state
    const [isLoading, setIsLoading] = useState(false); // Loading state for form submission
    const navigate = useNavigate(); // Hook for navigation

    /**
     * Creates an account using the backend API and the provided authentication token.
     * @param {string} authToken - The authentication token.
     * @returns {Promise<object>} The account creation response.
     */


    /**
     * Handles Google login and account creation.
     */
    const registerWithGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                // Send Google token to the backend for authentication
                const res = await axios.post(`${backend_domain}/api/v1/auth/google/callback`, {
                    token: tokenResponse.access_token, // ID Token from Google response
                });

                console.log('Backend Response:', res.data); // Log backend response
                const { token, user } = res.data;

                // Save token and user info in session storage and context
                login(token, user); // Update AuthContext login state

                // Create an account using the backend API
                createAccount(token)// Save account info in session storage
                navigate('/home'); // Navigate to home page
            } catch (error) {
                console.error('Error logging in with Google:', error.response?.data || error.message); // Log error
                setErrorMessage('Google login failed. Please try again.');
            }
        },
        onError: (error) => {
            console.error('Google login error:', error); // Log Google login error
            setErrorMessage('Google login error. Please try again.');
        },
    });

    /**
     * Handles form submission for user registration.
     */
    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault(); // Prevent default form submission
            setIsLoading(true); // Show loading state
            setErrorMessage(''); // Clear any previous errors

            if (password !== confirmPassword) {
                setErrorMessage("Passwords do not match."); // Show password mismatch error
                setIsLoading(false); // Reset loading state
                return;
            }

            try {
                // Register user with the backend API
                const response = await axios.post(`${backend_domain}/api/v1/auth/register`, {
                    name: username,
                    email,
                    password,
                });

                const { user, token, message } = response.data; // Destructure response data
                console.log('Registration successful:', message); // Log success message

                // Store token and user data
                login(token, user); // Update AuthContext login state


                // Create account after successful registration
                createAccount(token)// Save account info
                navigate('/home'); // Redirect to home page
            } catch (err) {
                console.error(err.response?.data?.message || err); // Log registration error
                setErrorMessage(err.response?.data?.message || 'Registration failed. Please try again.');
            } finally {
                setIsLoading(false); // Reset loading state
            }
        },
        [username, email, password, confirmPassword, login, navigate, createAccount, backend_domain]
    );

    return (
        <div className="register-container-content">
            <Link to="/" className='login-back-home'>
                ⬅️
            </Link>
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
                        autoFocus
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
