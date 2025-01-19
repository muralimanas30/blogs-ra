import { useContext, createContext, useState, useEffect } from "react";

import { useAuthContext } from "./AuthContext";
import axios from "axios";
import PropTypes from 'prop-types'



const AccountContext = createContext()
export const useAccountContext = () => useContext(AccountContext)


const AccountProvider = ({ children }) => {
    const { authToken, user, setUser, backend_domain, logout } = useAuthContext();

    const [accountInfo, setAccountInfo] = useState(null)


    useEffect(() => {
        const {account} = {account:JSON.parse(sessionStorage.getItem('accountInfo'))}
        if (account)
            setAccountInfo(account)
    }, [authToken])



    const createAccount = async (token) => {
        
        const currentToken = token || authToken;

        
        if (!currentToken) {
            throw new Error("Auth token is required");
        }

        try {
            
            const accountData = await axios.post(
                `${backend_domain}/api/v1/account`, 
                {}, 
                {
                    headers: {
                        Authorization: `Bearer ${currentToken}`,
                    },
                }
            );

            
            sessionStorage.setItem('accountInfo', JSON.stringify(accountData.data)); 
            setAccountInfo(accountData.data)
            console.log('Account creation successful');
            return accountData.data; 

        } catch (error) {
            
            if (error.response && error.response.status === 401) {
                alert('Session expired. Please log in again.');
                logout();
                setAccountInfo(null)
            } else {
                console.error('Error creating account:', error.response?.data || error.message); 
            }
            throw error; 
        }
    };


    /* -------------------------------------------------------------------------- */
    /*                             GET ACCOUNT DETAILS                            */
    /* -------------------------------------------------------------------------- */
    const getAccountDetails = async (userId) => {
        
        try {
        
            const accountData = await axios.post(
                `${backend_domain}/api/v1/accountdetails`, 
                { userId },
                {

                }
            );
            console.log('Fetched Account Info');
            return accountData.data;
        } catch (error) {
        
            if (error.response && error.response.status === 401) {
                alert('Session expired. Please log in again.');
                logout();
                setAccountInfo(null)
            } else {
                console.error('Error creating account:', error.response?.data || error.message);
            }
            throw error; // Propagate error to calling function
        }
    };


    /* -------------------------------------------------------------------------- */
    /*                     EDIT THE ACCOUNT (BIO AND PROFILE)                     */
    /* -------------------------------------------------------------------------- */
    const editAccount = async (token, form) => {
        const getAuthToken = () => token || authToken;
        const handleError = (error) => {
            if (error.response?.status === 401) {
                alert('Session expired. Please log in again.');
                logout();
                setAccountInfo(null)
            } else {
                console.error('Error editing account:', error.response?.data || error.message);
            }
            throw error;
        };
        const sendUpdateRequest = async (currentToken) => {
            const formData = new FormData(form);
            const response = await axios.post(
                `${backend_domain}/api/v1/accountupdate`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${currentToken}`,
                    },
                }
            );
            return response.data;
        };

        try {
            const currentToken = getAuthToken();
            if (!currentToken) throw new Error("Auth token is required");

            const accountData = await sendUpdateRequest(currentToken);
            setAccountInfo({
                ...accountInfo,
                user: {
                    ...accountInfo.user,
                    updatedAt: accountData.user.updatedAt,
                    bio: accountData.user.bio,
                    profilePicture: accountData.user.profilePicture,
                }
            })
            sessionStorage.setItem('accountInfo', JSON.stringify(accountInfo)); // Corrected line
            console.log('Account update successful');
            return accountData;
        } catch (error) {
            handleError(error);
        }
    };

    /* -------------------------------------------------------------------------- */
    /*                               VERIFY PASSWORD                              */
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
    /*                               DELETE ACCOUNT                               */
    /* -------------------------------------------------------------------------- */


    const deleteAccount = async (token) => {
        // Ensure we use the provided token or the authToken from the state
        const currentToken = token || authToken;
        if (!currentToken) {
            throw new Error("Auth token is required");
        }

        const headers = {
            Authorization: `Bearer ${currentToken}`, // Authorization header with Bearer token
        };

        try {
            // Make the API calls to delete account data
            await axios.delete(
                `${backend_domain}/api/v1/delete-everything`,
                { headers, data: { accountId: accountInfo.user.accountId } }
            );

            await axios.delete(
                `${backend_domain}/api/v1/auth`,
                { headers }
            );

            await axios.delete(
                `${backend_domain}/api/v1/account`,
                { headers }
            );

            // Log out the user and clear session data
            logout();
            setAccountInfo(null);
            

            console.log('Account Deleted Permanently');
            return true;

        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    alert('Session expired. Please log in again.');
                    logout();
                } else {
                    console.error('Error deleting account:', error.response.data);
                }
            } else {
                console.error('Network or server error:', error.message);
            }
            return false;
        }
    };



    /* -------------------------------------------------------------------------- */
    /*                GET USER POSTS, BASED ON THE QUERY PARAMETERS               */
    /* -------------------------------------------------------------------------- */


    const getUserPosts = async (token, accountId, page = 1, limit = 10, tags, liked,trending) => {
        const url = `${backend_domain}/api/v1/post/?` +
        `${accountId ? `&accountId=${accountId}` : ''}` +
        `${tags ? `&tags=${tags}` : ''}` +
        `&page=${page}` +
        `&limit=${limit}` +
        `${liked == true ? '&liked=true' : ''}`+
        `${trending == true ? '&trending=true' : ''}`;
        const currentToken = token || authToken;
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${currentToken}`, // Authorization header with Bearer token
                },
            });
            return response.data; // has data.posts and data.pagination
        } catch (error) {
            console.log(error?.response?.data.message || error);
            return {
                posts: [],
                pagination: {}
            };
        }
    };

    const likeUserPost = async (token, accountId, toLike, postId) => {
        const url = `${backend_domain}/api/v1/post/${postId}`;  // Use postId in URL path
        const currentToken = token || authToken; // Ensure proper token handling
        try {
            const response = await axios.patch(
                url,
                {
                    liked: toLike,
                    accountId: accountId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${currentToken}`, // Authorization header with Bearer token
                    },
                }
            );

            // Ensure the response contains the success field to determine whether the operation succeeded
            if (response.data.success) {
                return response;  // Return the full response or relevant data
            } else {
                throw new Error('Failed to update like');  // Throw an error if not successful
            }
        } catch (error) {
            // Improved error handling
            if (error.response) {
                console.error('Backend Error:', error.response.data.message || error.response.data);
            } else {
                console.error('Network Error:', error.message || error);
            }

            // Return a response indicating failure
            return {
                data: {
                    success: false,
                    message: 'An error occurred while updating the like',
                },
            };
        }
    };


    const createNewPost = async (token, accountId, postData) => {
        const url = `${backend_domain}/api/v1/post/`;  // Use postId in URL path

        const currentToken = token || authToken; // Ensure proper token handling

        try {
            const formData = new FormData();
            formData.append('accountId', accountId);
            Object.entries(postData).forEach(([key, value]) => {
                formData.append(key, value);
            });

            const response = await axios.post(url, formData, {
                headers: {
                    Authorization: `Bearer ${currentToken}`,
                    // Content-Type is automatically set by Axios for FormData
                },
            });
            return response
        }
        catch (error) {

            if (error.response) {
                console.error('Backend Error:', error.response.data.message || error.response.data);
            } else {
                console.error('Network Error:', error.message || error);
            }
            // Return a response indicating failure
            return {
                data: {
                    success: false,
                    message: 'An error occurred while updating the like',
                },
            };
        }
    }

    /* -------------------------------------------------------------------------- */
    /*                                 deletePost                                 */
    /* -------------------------------------------------------------------------- */

    const deletePost = async (token, accountId, postId) => {
        const url = `${backend_domain}/api/v1/post/${postId}`;  // Use postId in URL path

        const currentToken = token || authToken; // Ensure proper token handling

        try {

            const response = await axios.delete(url,
                {
                    data: { accountId },
                    headers: {
                        Authorization: `Bearer ${currentToken}`,
                    },
                });
            return response
        }
        catch (error) {
            if (error.response) {
                console.error('Backend Error:', error.response.data.message || error.response.data);
            } else {
                console.error('Network Error:', error.message || error);
            }
            return {
                data: {
                    success: false,
                    message: 'An error occurred while updating the like',
                },
            };
        }
    }

    return (
        <AccountContext.Provider value={{
            createAccount,
            validatePassword,
            deleteAccount,
            editAccount,
            getAccountDetails,
            getUserPosts,
            accountInfo,
            setAccountInfo,
            likeUserPost,
            createNewPost,
            deletePost
        }}>
            {children}
        </AccountContext.Provider>
    )
}

AccountProvider.propTypes = {
    children: PropTypes.node.isRequired
}
export default AccountProvider