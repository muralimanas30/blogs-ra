import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Create the AuthContext using React's createContext API
const AuthContext = createContext();

// Custom hook to use AuthContext, making it easier to access auth-related values throughout your components
export const useAuthContext = () => {
    return useContext(AuthContext);
};

// AuthProvider component which manages the authentication state
const AuthProvider = ({ children }) => {
    // State to store the authentication token
    const [authToken, setAuthToken] = useState(null);

    // Effect hook to check local storage for an existing token when the component mounts
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthToken(token); // Set the token to state if it exists in localStorage
        }
    }, []); // Empty dependency array means this runs only once after the first render

    // Function to log in by storing the token and updating the state
    const login = (token) => {
        localStorage.setItem('token', token); // Save the token in localStorage
        setAuthToken(token); // Update state with the new token
    };

    // Function to log out by removing the token and resetting the state
    const logout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        setAuthToken(null); // Clear the state
    };

    return (
        // Provide the context to the rest of the app
        <AuthContext.Provider value={{ authToken, login, logout }}>
            {children} {/* Render children components */}
        </AuthContext.Provider>
    );
};

// Prop types for AuthProvider to ensure 'children' prop is valid
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, // 'children' can be any renderable content (e.g., JSX, strings, numbers)
};

export default AuthProvider;
