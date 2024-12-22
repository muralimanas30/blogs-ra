import { useState, useEffect } from 'react';
import './Account.css'; 
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AreYouSure from '../AreYouSure/AreYouSure';
import CustomPopUp from '../CustomPopUp/CustomPopUp';

const Account = () => {
    const navigate = useNavigate();
    const [accountInfo, setAccountInfo] = useState(null);
    const { createAccount, authToken} = useAuthContext();
    const [showConfirm, setShowConfirm] = useState(false);
    const [showTakePassword, setShowTakePassword] = useState(false);
    const [loading, setLoading] = useState(false); // Add a loading state

    useEffect(() => {
        const storedAccountInfo = sessionStorage.getItem('accountInfo');
        if (storedAccountInfo) {
            setAccountInfo(JSON.parse(storedAccountInfo));
            setLoading(false); // Once the data is fetched, set loading to false
        } else {
            const fetchAccountInfo = async () => {
                if (authToken) {
                    try {
                        const data = await createAccount(authToken);
                            setAccountInfo(data);
                            sessionStorage.setItem('accountInfo', JSON.stringify(data));
                            
                    } catch (error) {
                        console.log(error);
                    }
                    finally{
                        setLoading(false)
                    }
                }
            };
            fetchAccountInfo();
        }
    }, [authToken, createAccount]);

    const handleDeleteAccount = async () => {
        setShowConfirm(true);

    };
    
    const handleBackToHome = () => {
        navigate('/');
    };
    
    if (!accountInfo) {
        return <div>Loading...</div>;
    }
    

    // Display loading state until the account data is fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {showConfirm ? (
                <AreYouSure setShowConfirm={setShowConfirm} setShowTakePassword={setShowTakePassword} />
            ) : null}
            {showTakePassword ? (
                <CustomPopUp shouldDelete={true} setShowTakePassword={setShowTakePassword} />
            ) : null}

            <div className="account-container">
                <div className="account-header">Your Account Information</div>
                <div className="account-info">
                    <div className="info-item">
                        <strong>Name:</strong> {accountInfo.user?.name || 'N/A'}
                    </div>
                    <div className="info-item">
                        <strong>Email:</strong> {accountInfo.user?.email || 'N/A'}
                    </div>
                    <div className="info-item">
                        <strong>Bio:</strong> {accountInfo.user?.bio || 'N/A'}
                    </div>
                    <div className="info-item">
                        <strong>Posts:</strong> {accountInfo.user?.blogStats?.posts || 0}
                    </div>
                    <div className="info-item">
                        <strong>Followers:</strong> {accountInfo.user?.blogStats?.followers || 0}
                    </div>
                    <div className="info-item">
                        <strong>Following:</strong> {accountInfo.user?.blogStats?.following || 0}
                    </div>
                    <div className="info-item">
                        <strong>Joined On:</strong> {new Date(accountInfo.user?.createdAt).toLocaleDateString() || 'N/A'}
                    </div>
                </div>
                <div className="account-buttons">
                    <button onClick={()=>{handleDeleteAccount()}} className="delete-button">
                        Delete Account
                    </button>
                    <button onClick={handleBackToHome} className="back-button">
                        Back to Home
                    </button>
                </div>
            </div>
        </>
    );
};

export default Account;