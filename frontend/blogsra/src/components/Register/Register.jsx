import React, { useState, useCallback } from 'react'; 
import './Register.css';
import axios from 'axios'; 
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { FaGoogle, FaApple } from 'react-icons/fa'; 
import { useGoogleLogin } from '@react-oauth/google';
import { useAccountContext } from '../../context/AccountContext';
import useSearchBox from '../SearchBox/useSearchBox';

const Register = () => {
    const { login, backend_domain,tryRegister } = useAuthContext(); 
    const { createAccount } = useAccountContext()

    
    const {inputValue:username, setInputValue:setUsername} = useSearchBox()
    const {inputValue:email, setInputValue:setEmail} = useSearchBox()
    const {inputValue:password, setInputValue:setPassword} = useSearchBox()
    const {inputValue:confirmPassword, setInputValue:setConfirmPassword} = useSearchBox()

    
    const [errorMessage, setErrorMessage] = useState(''); 
    const [isLoading, setIsLoading] = useState(false); 
    const navigate = useNavigate(); 

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
            setIsLoading(true);
            try {
                const res = await axios.post(`${backend_domain}/api/v1/auth/google/callback`, {
                    token: tokenResponse.access_token,
                });

                console.log('Backend Response:', res.data);
                const { token, user } = res.data;
                login(token, user);
                createAccount(token)
                navigate('/home');
            } catch (error) {
                setErrorMessage('Error logging in with Google:', error.response?.data || error.message);
            }
            finally{
                setIsLoading(false)
            }
        },
        onError: (error) => {
            console.error('Google login error:', error); 
            setErrorMessage('Google login error. Please try again.');
        },
    });

    /**
     * Handles form submission for user registration.
     */
    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault(); 
            setErrorMessage('');
            
            if (password !== confirmPassword) {
                setErrorMessage("Passwords do not match."); 
                return;
            }
            
            setIsLoading(true); 
            try {
                // Register user with the backend API
                const response = await tryRegister(username,email,password)

                const { token} = response.data;
                console.log('Registration successful:');

                createAccount(token)
                navigate('/home');
            } catch (err) {
                setErrorMessage(err.response?.data?.message || 'Registration failed. Please try again.');
            } finally {
                setIsLoading(false);
            }
        },
        [password, confirmPassword, tryRegister, username, email, createAccount, navigate]
    );

    return (
        <div className="auth-container">
            <div className="register-container-content">
                <Link to="/" className='login-back-home'>
                    ⬅️
                </Link>
                <h1 className="company-name">BlogsRa</h1>
                {/* Display error message if there's any */}
                {errorMessage && <div className="error-message">{errorMessage}</div>}

                {/* Social login buttons */}
                <div className="social-login">
                    <button className="google-login" type="button" onClick={registerWithGoogle} disabled={isLoading}>
                        Google <FaGoogle />
                    </button>
                    <button className="apple-login" type="button" disabled>
                        Apple <FaApple />
                    </button>
                </div>
                <div className="divider"></div> {/* Horizontal line */}

                {/* Registration form */}
                <form method="post" onSubmit={handleSubmit} disabled={isLoading}>
                    {/* Username input */}
                    <div className="usrbox">
                        <label htmlFor="username-input">Name</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} // Update username state
                            placeholder="Enter your username"
                            required
                            autoFocus disabled={isLoading}
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
                            required disabled={isLoading}
                        />
                    </div>

                    {/* Password input */}
                    <div className="passwordbox">
                        <label htmlFor="password-input">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required disabled={isLoading}
                        />
                    </div>

                    
                    <div className="passwordbox">
                        <label htmlFor="confirm-password-input">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            required disabled={isLoading}
                        />
                    </div>

                    {/* Submit button */}
                    <div className="submit-box">
                        <button className='custom-button' type="submit" disabled={isLoading}>
                            {isLoading ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                </form>

                <div className="login-box">
                    <p className="login-above">Already have an account? Login below</p>
                    <Link to="/login">
                        <button className="login-button" type="button">
                            LOGIN
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
