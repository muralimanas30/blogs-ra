import { FaGoogle, FaApple } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import './Login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';
import { useAccountContext } from '../../context/AccountContext';
import useSearchBox from '../SearchBox/useSearchBox';
const Login = () => {



    const {inputValue:email, setInputValue:setEmail} = useSearchBox()
    const {inputValue:password, setInputValue:setPassword} = useSearchBox()
    
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { backend_domain, tryLogin, login, authToken } = useAuthContext();
    const { createAccount } = useAccountContext()
    useEffect(() => {
        if (authToken) navigate('/');
    }, [navigate, authToken]);


    const loginWithGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setIsLoading(true);
            try {

                const res = await axios.post(`${backend_domain}/api/v1/auth/google/callback`, {
                    token: tokenResponse.access_token,
                });

                const { token, user } = res.data;
                login(token, user);
                createAccount(token)
                navigate('/home');
            } catch (error) {
                setErrorMessage('Google login failed. Please try again.');
            }
            finally {
                setIsLoading(false)
            }
        },
        onError: (error) => {
            console.error('Google login error:', error);
            setErrorMessage('Google login error. Please try again.');
        },
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        try {
            const response = await tryLogin(email, password)
            const { token } = response.data;
            createAccount(token)
            console.log('Login successful:')
            navigate('/home');
        } catch (err) {
            setErrorMessage(err.response?.data?.message || 'Login failed. Please try again.');
            console.dir(err, { depth: null })
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='auth-container'>
            
            <div className="login-container-content">
                {isLoading ? <div className="barspinner">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div> : null}

                <h1 className="company-name">BlogsRa</h1>
                <Link to="/" className='login-back-home'>
                    ⬅️
                </Link>
                {/* Display error message if there's any */}
                {errorMessage && <div className="error-message">{errorMessage}</div>}

                {/* Third-party sign-in buttons */}
                <div className="social-login">
                    <button className="google-login" type="button" onClick={loginWithGoogle} disabled={isLoading}>
                        Google <FaGoogle />
                    </button>
                    <button className="apple-login" type="button" disabled={true} >
                        Apple <FaApple />
                    </button>
                </div>
                <div className="divider"></div> {/* Horizontal line */}

                {/* Login form */}
                <form method="post" onSubmit={handleSubmit}>
                    {/* Email input */}
                    <div className="usrbox">
                        <label htmlFor="email-input">Email</label>
                        <input disabled={isLoading}
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Update email state
                            placeholder="Enter your email"
                            required
                            autoFocus
                        />
                    </div>

                    {/* Password input */}
                    <div className="passwordbox">
                        <label htmlFor="password-input">Password</label>
                        <input disabled={isLoading}
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Update password state
                            placeholder="Enter your password"
                            minLength="6"
                            required
                        />
                        <p className="forgot-password">
                            <Link to="/forgot-password">Forgot password?</Link>
                        </p>
                    </div>

                    {/* Submit button */}
                    <div className="submit-box">
                        <button className='custom-button' type="submit" disabled={isLoading}>
                            {isLoading ? 'Logging in...' : 'Login'} {/* Show loading text when logging in */}
                        </button>
                    </div>
                </form>

                {/* Register section */}
                <div className="register-box">
                    <p className="register-above">Dont have an account? You can register below</p>
                    <Link to="/register">
                        <button className="register-button" type="button">
                            REGISTER
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};



export default Login;
