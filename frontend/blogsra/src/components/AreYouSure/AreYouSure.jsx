import React from 'react';
import './AreYouSure.css'
import PropTypes from 'prop-types'
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const AreYouSure = ({ setShowConfirm, setShowTakePassword }) => {
    const {user,authToken,deleteAccount} = useAuthContext()
    const navigate = useNavigate()
    const handleConfirm = async()=>{
        setShowConfirm(false)
        if(user.byOAuth){
            const shouldDelete = await deleteAccount(authToken)
            if(shouldDelete){
                toast.success('Account Deleted')
                navigate('/')
            }
        }
        else{
            setShowTakePassword(true)
        }
    }
    return (
        <div className="confirm-box-container__are-you-sure">
            <div className="confirm-box__icon-container">
                <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className="confirm-box__icon"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clipRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        fillRule="evenodd"
                    ></path>
                </svg>
            </div>
            <h2 className="confirm-box__title">Are you sure?</h2>
            <p className="confirm-box__description">
            This will delete your account permanently. All your photos and blogs will be lost. This process cannot be undone. <br />Are you sure?
            </p>
            <div className="confirm-box__button-container">
                <button className="confirm-box__cancel-button" onClick={()=>setShowConfirm(false)}>Cancel</button>
                <button className="confirm-box__confirm-button" onClick={
                    ()=>{handleConfirm()}}>Confirm</button>
            </div>
        </div>
    );
};



AreYouSure.propTypes = {
    setShowConfirm: PropTypes.func.isRequired,
    setShowTakePassword: PropTypes.func.isRequired,
};

export default AreYouSure;
