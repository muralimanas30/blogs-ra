import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import './CustomPopUp.css';
import { useAuthContext } from '../../context/AuthContext';

import reducer, { initialState } from './reducer'; 
import { useAccountContext } from '../../context/AccountContext';
import { useNavigate } from 'react-router-dom';

const PasswordPopUp = ({ setShowTakePassword }) => {
    const { user, authToken,logout } = useAuthContext();
    const navigate = useNavigate()    
    const {deleteAccount,validatePassword} = useAccountContext()
    const [state, dispatch] = useReducer(reducer, initialState); // Using useReducer

    const handleSubmit = async () => {
        if (state.pass.length < 6) {
            dispatch({ type: "MINIMUM 6" });
            return;
        }

        dispatch({ type: "VERIFY PASSWORD" });

        try {
            const isValid = await validatePassword(authToken, state.pass);
            if (!isValid) {
                dispatch({ type: "INVALID PASSWORD" });
                return;
            }

            const shouldDelete = await deleteAccount(authToken);
            if (shouldDelete) {
                dispatch({ type: "SHOULD DELETE" });
                setShowTakePassword(false);
                logout()
                navigate('/')
            } else {
                alert('Failed to delete account. Please try again.');
            }
        } catch (error) {
            console.error('Error during account deletion:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <div className="CustomPopUp-mainContainer">
            <div className="form__group field">
                {state.errorMsg && <p className="error-message">{state.errorMsg}</p>}
                <p className="confirm-box__description">
                    Sad to see you leaving <br />
                    {user.name}, please enter the password for your email: <br />
                    <strong>{user.email}</strong>
                </p>
                <input
                    type="password"
                    className="form__field"
                    value={state.pass}
                    placeholder="Password"
                    required
                    onChange={(e) =>
                        dispatch({ type: "SET PASS", payload: { pass: e.target.value } })
                    }
                />
                <label htmlFor="name" className="form__label">Password</label>
                <button
                    className="CustomPopUpDeletebutton"
                    onClick={handleSubmit}
                    disabled={state.loading}
                >
                    <span className="button__text">Delete</span>
                    <span className="button__icon">
                        <svg className="svg" height="512" viewBox="0 0 512 512" width="512">
                            <path
                                d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320"
                                fill="none"
                                stroke="#fff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="32px"
                            ></path>
                            <line
                                stroke="#fff"
                                strokeLinecap="round"
                                strokeMiterlimit="10"
                                strokeWidth="32px"
                                x1="80"
                                x2="432"
                                y1="112"
                                y2="112"
                            ></line>
                            <path
                                d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40"
                                fill="none"
                                stroke="#fff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="32px"
                            ></path>
                            <line
                                fill="none"
                                stroke="#fff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="32px"
                                x1="256"
                                x2="256"
                                y1="176"
                                y2="400"
                            ></line>
                            <line
                                fill="none"
                                stroke="#fff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="32px"
                                x1="184"
                                x2="192"
                                y1="176"
                                y2="400"
                            ></line>
                            <line
                                fill="none"
                                stroke="#fff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="32px"
                                x1="328"
                                x2="320"
                                y1="176"
                                y2="400"
                            ></line>
                        </svg>
                    </span>
                </button>
                <button onClick={() => setShowTakePassword(false)}>Cancel</button>
            </div>
        </div>
    );
};

PasswordPopUp.propTypes = {
    setShowTakePassword: PropTypes.func.isRequired,
};

export default PasswordPopUp;
