import { FaGoogle, FaApple } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import './Login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';
const Login = () => {

    const { backend_domain } = useAuthContext()
    // State to manage input values and error messages
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); // Hook to navigate between routes
    const { login, authToken, createAccount } = useAuthContext(); // Use the login function from AuthContext

    useEffect(() => {
        if (authToken) navigate('/'); // If user is already authenticated, redirect to home
    }, [navigate, authToken]);

    // Google Login functionality
    const loginWithGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                // Send the token to the backend
                const res = await axios.post(`${backend_domain}/api/v1/auth/google/callback`, {
                    token: tokenResponse.access_token,
                });

                const { token, user } = res.data;
                // Save token and user data
                login(token, user); // Save token in AuthContext
                createAccount(token)
                navigate('/home'); // Navigate to home page
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


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setIsLoading(true); // Set loading state to true while the request is being made
        setErrorMessage(''); // Clear previous error messages

        try {
            // Make the API request to login the user
            const response = await axios.post(`${backend_domain}/api/v1/auth/login`, { email, password });

            const { user, token, message } = response.data; // Destructure response from backend

            // Store the token and user data in localStorage and in AuthContext
            login(token, user); // Store token in AuthContext
            createAccount(token)
            console.log('Login successful:', message); // Log success message
            navigate('/home');  // Redirect to home page after successful login
        } catch (err) {
            // Handle any error from the API request
            console.log(err.response?.data?.message || err);
            setErrorMessage(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false); // Reset loading state once the request is done
        }
    };

    return (
        <>

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
                    <button className="google-login" type="button" onClick={loginWithGoogle}  disabled = {isLoading}>
                        Google <FaGoogle />
                    </button>
                    <button className="apple-login" type="button"  disabled = {isLoading}>
                        Apple <FaApple />
                    </button>
                </div>
                <div className="divider"></div> {/* Horizontal line */}

                {/* Login form */}
                <form method="post" onSubmit={handleSubmit}>
                    {/* Email input */}
                    <div className="usrbox">
                        <label htmlFor="email-input">Email</label>
                        <input disabled = {isLoading}
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
                        <input disabled = {isLoading}
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
                        <button type="submit" disabled={isLoading}>
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
        </>
    );
};



export default Login;
// import React, { useState } from 'react';
// import './Login.css';
// import axios from 'axios';
// import { useQuery } from '@tanstack/react-query';
// import { Link, useNavigate } from 'react-router-dom';
// const Login = () => {
//     // State to manage input values and error messages
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const navigate = useNavigate(); // Hook to navigate between routes

//     // Use React Query to handle login request with refetching disabled (manual trigger)
//     const { data, error, isLoading, refetch } = useQuery({
//         queryKey: ['login', { email, password }],
//         queryFn: () => axios.post('http://localhost:3000/api/v1/auth/login', { email, password }), // Login API request
//         enabled: false,  // Disabling automatic query execution
//         retry: 2,  // Disable retry in case of failure
//     });

//     // Handle form submission by calling the refetch method to trigger the login API request
//     const handleSubmit = (e) => {
//         e.preventDefault(); // Prevent default form submission behavior
//         refetch();  // Trigger the refetch manually for the login query
//     };

//     // Show loading state while the request is in progress
//     if (isLoading) return <div>Loading ...</div>;

//     // Handle any error from the API request and display it
//     if (error) {
//         console.log(error.response?.data?.message || error.message); // Log the error message
//         setErrorMessage(error.response?.data?.message || 'Login failed. Please try again.'); // Set error message to show
//     }

//     // If login is successful, store token and user data in localStorage and navigate to home page
//     if (data) {
//         const { user, token, message } = data.data;  // Destructure response from backend

//         // Store the token in localStorage for future authenticated requests
//         localStorage.setItem('token', token);

//         // Optionally store user data in localStorage if needed later in the app
//         localStorage.setItem('user', JSON.stringify(user));
//         console.log('Login successful:', message); // Log success message
//         navigate('/');  // Redirect to home page after successful login
//         return <div>{message}</div>; // Display success message
//     }
//     return (
//         <div className="login-container-content">
//             {/* Display error message if there's any */}
//             {errorMessage && <div className="error-message">{errorMessage}</div>}

//             {/* Login form */}
//             <form method="post" onSubmit={handleSubmit}>
//                 {/* Username input */}
//                 <div className="usrbox">
//                     <label htmlFor="user-input">Name</label>
//                     <input
//                         type="text"
//                         name="username"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)} // Update email state
//                         placeholder="Enter your username"
//                         required
//                     />
//                 </div>

//                 {/* Password input */}
//                 <div className="passwordbox">
//                     <label htmlFor="password-input">Password</label>
//                     <input
//                         type="password"
//                         name="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)} // Update password state
//                         placeholder="Enter your password"
//                         required
//                     />
//                 </div>

//                 {/* Submit button */}
//                 <div className="submit-box">
//                     <button type="submit" disabled={isLoading}>
//                         {isLoading ? 'Logging in...' : 'Login'} {/* Show loading text when logging in */}
//                     </button>
//                 </div>
//             </form>

//             {/* Register link to navigate to the register page */}
//             <p> Dont have an account? You can register below</p>
//             <Link to="/register"> {/* Link to navigate to the /register page */}
//                 <button type="button">REGISTER</button>
//             </Link>
//         </div>
//     );
// };


