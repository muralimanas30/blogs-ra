import axios from 'axios';
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDeviceOS } from 'react-haiku';
import { toast } from 'react-toastify';


const AuthContext = createContext();


export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {


    const [authToken, setAuthToken] = useState(sessionStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [IP, setIP] = useState({})

    const backend_domain = import.meta.env.VITE_BACKEND_DOMAIN || 'http://localhost:3000';
    const isInitiated = useRef(null)
        useEffect(() => {
            const initiator = async () => {
                if (isInitiated.current) return;
                isInitiated.current = true;
                toast.success("Getting server started, wait a minute",{autoClose: 2000});
                try {
                    await axios.get(`${backend_domain}/api/v1/starter`);
                    toast.success("Server initiated successfully!", {
                        autoClose: 2000,
                    });
                } catch (error) {
                    console.error("Error initiating server", error);
                    toast.error("Server initiation failed.", {
                        autoClose: 2000,
                    });
                }
            };
            if(!authToken && !isInitiated.current)
                initiator();
        }, [backend_domain]);
        
    



    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const storedUser = sessionStorage.getItem('user');
        if (token) {
            setAuthToken(token);
        }
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [authToken, IP]);



    /* -------------------------------------------------------------------------- */
    /*                               login function                               */
    /* -------------------------------------------------------------------------- */

    // Function to log in by storing the token and user info in sessionStorage and updating the state

    const tryLogin = async (email, password) => {
        const response = await axios.post(`${backend_domain}/api/v1/auth/login`, { email, password });
        const { user, token, message } = response.data; // Destructure 
        login(token, user)
        return response
    }

    const tryRegister = async (name, email, password) => {
        const response = await axios.post(`${backend_domain}/api/v1/auth/register`, {
            name,
            email,
            password,
        });

        const { user, token } = response.data; // Destructure 
        login(token, user)
        return response

    }

    const login = (token, userData) => {



        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(userData));
        setAuthToken(token); // Update state with the new token
        setUser(userData); // Update state with user data
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
    /*                            GET IP AND DETAILS                            */
    /* -------------------------------------------------------------------------- */
    const getIP = async () => {
        try {
            // const response = await axios.get('https://ipapi.co/json');
            // setIP(response.data);
        } catch (error) {
            console.error('Error fetching IP:', error);
            return {
                err: error
            }
        }
    };
    return (
        <AuthContext.Provider value={{
            authToken,
            user,
            login,
            logout,
            backend_domain,
            getIP,
            IP,
            tryLogin,
            tryRegister,
            deviceOS: useDeviceOS()
        }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
