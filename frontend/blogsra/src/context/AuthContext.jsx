import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';


// Create the AuthContext using React's createContext API
const AuthContext = createContext();

// Custom hook to use AuthContext, making it easier to access auth-related values throughout your components
export const useAuthContext = () => useContext(AuthContext);
// AuthProvider component which manages the authentication state
const AuthProvider = ({ children }) => {
    // State to store the authentication token

    const [authToken, setAuthToken] = useState(sessionStorage.getItem('token'));
    const [user, setUser] = useState(null); // Manage user state for user data
    const [IP, setIP] = useState({})

    const backend_domain = import.meta.env.VITE_BACKEND_DOMAIN || 'http://localhost:3000';

    // Effect hook to check sessionStorage for an existing token when the component mounts
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const storedUser = sessionStorage.getItem('user');
        if (token) {
            setAuthToken(token); // Set the token to state if it exists in sessionStorage
        }
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Set user data if it exists
        }
    }, [authToken, IP]);


    /* -------------------------------------------------------------------------- */
    /*                               login function                               */
    /* -------------------------------------------------------------------------- */

    // Function to log in by storing the token and user info in sessionStorage and updating the state
    const login = (token, userData) => {
        sessionStorage.setItem('token', token); // Save the token in sessionStorage
        sessionStorage.setItem('user', JSON.stringify(userData)); // Save user data
        setAuthToken(token); // Update state with the new token
        setUser(userData); // Update state with user data
    };

    /* -------------------------------------------------------------------------- */
    /*                           create account function                          */
    /* -------------------------------------------------------------------------- */

    const createAccount = async (token) => {
        // Ensure we use the provided token or the authToken from the state
        const currentToken = token || authToken;

        // If no token is available, throw an error
        if (!currentToken) {
            throw new Error("Auth token is required");
        }

        try {
            // Make the API call to create the account
            const accountData = await axios.post(
                `${backend_domain}/api/v1/account`, // Backend domain
                {}, // Empty body as no additional data is required
                {
                    headers: {
                        Authorization: `Bearer ${currentToken}`, // Authorization header with Bearer token
                    },
                }
            );

            // Store the account information in sessionStorage for persistence
            sessionStorage.setItem('accountInfo', JSON.stringify(accountData.data));
            console.log('Account creation successful');
            return accountData.data; // Return the created account data

        } catch (error) {
            // Handle token expiration or unauthorized error (401 status code)
            if (error.response && error.response.status === 401) {
                alert('Session expired. Please log in again.');
                logout(); // Log out the user if the session expired
            } else {
                console.error('Error creating account:', error.response?.data || error.message); // Log other errors
            }
            throw error; // Propagate error to calling function
        }
    };

    /* -------------------------------------------------------------------------- */
    /*                            EDIT ACCOUNT FUNCTION                           */
    /* -------------------------------------------------------------------------- */
    const editAccount = async (token, form) => {
        // Ensure we use the provided token or the authToken from the state
        const currentToken = token || authToken;

        // If no token is available, throw an error
        if (!currentToken) {
            throw new Error("Auth token is required");
        }
        // const {bio,profilePicture} = JSON.parse(sessionStorage.getItem('accountInfo')).user
        // console.dir(profilePicture,{depth:null})
        try {
            // Make the API call to create the account
            const formData = new FormData(form);
            const accountData = await axios.post(
                `${backend_domain}/api/v1/accountupdate`,
                formData,  // Send the FormData directly
                {
                    headers: {
                        Authorization: `Bearer ${currentToken}`,  // Authorization header if needed
                    },
                }
            );

            // Store the account information in sessionStorage for persistence
            let acc = JSON.parse(sessionStorage.getItem('accountInfo'))
            acc.user.updatedAt = accountData.data.user.updatedAt;
            acc.user.bio = accountData.data.user.bio;
            acc.user.profilePicture = accountData.data.user.profilePicture;
            // sessionStorage.setItem('accountInfo', JSON.stringify(accountData.data));
            sessionStorage.setItem('accountInfo', JSON.stringify(acc));
            console.log('Account Updation successful');
            return accountData.data; // Return the created account data

        } catch (error) {
            // Handle token expiration or unauthorized error (401 status code)
            if (error.response && error.response.status === 401) {
                alert('Session expired. Please log in again.');
                logout(); // Log out the user if the session expired
            } else {
                console.error('Error editing account:', error.response?.data || error.message); // Log other errors
            }
            throw error; // Propagate error to calling function
        }
    };


    /* -------------------------------------------------------------------------- */
    /*                               logout function                              */
    /* -------------------------------------------------------------------------- */
    // Function to log out by removing the token and user info from sessionStorage and resetting the state
    const logout = () => {
        sessionStorage.removeItem('token'); // Remove token from sessionStorage
        sessionStorage.removeItem('user'); // Remove user info from sessionStorage
        sessionStorage.removeItem('accountInfo')
        setAuthToken(null); // Clear the token from state
        setUser(null); // Clear user data from state
    };

    /* -------------------------------------------------------------------------- */
    /*                              validate password                             */
    /* -------------------------------------------------------------------------- */

    const validatePassword = async (token, password) => {
        // Ensure we use the provided token or the authToken from the state
        const currentToken = token || authToken;

        // If no token is available, throw an error
        if (!currentToken) {
            throw new Error("Auth token is required");
        }

        try {
            // Make the API call to validate the password
            const response = await axios.post(
                `${backend_domain}/api/v1/auth/verifypassword`,
                {
                    email: user.email, // Include the user's email
                    password: password, // Include the password to validate
                },
                {
                    headers: {
                        Authorization: `Bearer ${currentToken}`, // Authorization header with Bearer token
                    },
                }
            );

            // If the password is valid, return true
            if (response.status === 200) {
                console.log('Valid Password');
                return true;
            }

            // If the password is invalid, return false
            console.log('Invalid Password');
            return false;
        } catch (error) {
            // Handle token expiration or unauthorized error (401 status code)
            if (error.response && error.response.status === 401) {
                console.log("Invalid Password")
                return false;
            } else {
                console.error('Error validating password:', error.response?.data || error.message); // Log other errors
            }
            return false; // Return false if validation failed
        }
    };

    /* -------------------------------------------------------------------------- */
    /*                           delete user and account                          */
    /* -------------------------------------------------------------------------- */
    const deleteAccount = async (token) => {
        // Ensure we use the provided token or the authToken from the state
        const currentToken = token || authToken;
        // If no token is available, throw an error
        if (!currentToken) {
            throw new Error("Auth token is required");
        }
        try {
            const userData = await axios.delete(
                `${backend_domain}/api/v1/auth`, // Backend domain

                {
                    headers: {
                        Authorization: `Bearer ${currentToken}`, // Authorization header with Bearer token
                    },
                }
            );
            // Make the API call to delete the account
            const accountData = await axios.delete(
                `${backend_domain}/api/v1/account`, // Backend domain

                {
                    headers: {
                        Authorization: `Bearer ${currentToken}`, // Authorization header with Bearer token
                    },
                }
            );
            // Log out the user and clear session data
            logout();
            console.log('Account Deleted Permanently'); // Log account deletion
            return true;

        } catch (error) {
            // Handle token expiration or unauthorized error (401 status code)
            if (error.response && error.response.status === 401) {
                alert('Session expired. Please log in again.');
                logout(); // Log out the user if the session expired
            } else {
                console.error('Error deleting account:', error.response?.data || error.message); // Log other errors
            }
            return false;
        }
    };
    /* -------------------------------------------------------------------------- */
    /*                            GET IP AND DETAILS                            */
    /* -------------------------------------------------------------------------- */
    const getIP = async () => {
        try {
            const response = await axios.get('https://ipapi.co/json');
            setIP(response.data);  // Set the actual data (not the whole response object)
        } catch (error) {
            console.error('Error fetching IP:', error);  // Handle errors gracefully
        }
    };

    return (
        // Provide the context to the rest of the app
        <AuthContext.Provider value={{
            authToken,
            user,
            login,
            logout,
            backend_domain,
            createAccount,
            validatePassword,
            deleteAccount,
            getIP,
            IP,
            editAccount,

        }}>
            {children} {/* Render children components */}
        </AuthContext.Provider>
    );
};

// Prop types for AuthProvider to ensure 'children' prop is valid
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, // 'children' can be any renderable content (e.g., JSX, strings, numbers)
};

export default AuthProvider;
