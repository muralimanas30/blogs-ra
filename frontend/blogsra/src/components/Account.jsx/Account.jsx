import { useState, useEffect, useRef } from 'react';
import './Account.css';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AreYouSure from '../AreYouSure/AreYouSure';
import CustomPopUp from '../CustomPopUp/PasswordPopUp';
import AccountInfo from './SubComponents/AccountInfo';
import Notifications from './SubComponents/Notifications';
import Settings from './SubComponents/Settings';
import EditBio from './SubComponents/EditBio';
import SimpleComponent from '../SimpleComponent/SimpleComponent';
import Loader from '../Loader/Loader';
import { useAccountContext } from '../../context/AccountContext';

const Account = () => {
    const navigate = useNavigate();
    const {authToken } = useAuthContext();
    const {createAccount,accountInfo,setAccountInfo} = useAccountContext()
    const [showConfirm, setShowConfirm] = useState(false);
    const [showTakePassword, setShowTakePassword] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('account');
    const [isEditingBio, setIsEditingBio] = useState(false);
    
    const [error, setError] = useState(null);

    useEffect(() => {
        
        if (!accountInfo) {
            const fetchAccountInfo = async () => {
                try {
                    const data = await createAccount(authToken);
                    setAccountInfo(data);
                    sessionStorage.setItem('accountInfo', JSON.stringify(data));
                } catch (error) {
                    setError('Failed to fetch account information.');
                    console.error('Error fetching account info:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchAccountInfo();
        } else {
            setLoading(false);
        }
    }, [authToken]);

    const handleDeleteAccount = () => setShowConfirm(true);
    const handleBackToHome = () => navigate('/');
    const handleEdit = () => setIsEditingBio(true);
    const handleCancelEdit = () => setIsEditingBio(false);

    if (loading) {
        return <Loader />;
    }

    // If accountInfo is null or undefined, show an appropriate fallback
    if (!accountInfo) {
        return <div>Please log in to view your account information.</div>;
    }

    return (
        <>
            {showConfirm && <AreYouSure setShowConfirm={setShowConfirm} setShowTakePassword={setShowTakePassword} />}
            {showTakePassword && <CustomPopUp shouldDelete={true} setShowTakePassword={setShowTakePassword} />}
            
            {error && <div className="error-message">{error}</div>}

            <div className="account-container">
                <div className="account-header">Your Account Information</div>
                <div className="account-wrapper-settings-content">
                    <div className="account-settings">
                        <div className="account-profile-image">
                            <img src={accountInfo?.user?.profilePicture} alt="Profile" />
                        </div>
                        <div className="account-navigation">
                            <ul className="account-navigation-ul">
                                <li className={activeTab === 'my blogs' ? 'active' : ''} onClick={() => setActiveTab('my blogs')}>My Blogs</li>
                                <li className={activeTab === 'account' ? 'active' : ''} onClick={() => setActiveTab('account')}>Account</li>
                                <li className={activeTab === 'notifications' ? 'active' : ''} onClick={() => setActiveTab('notifications')}>Notifications</li>
                                <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>Settings</li>
                            </ul>
                        </div>
                    </div>
                    <div className="account-content">
                        {activeTab === 'my blogs' && <SimpleComponent/>}
                        {activeTab === 'account' && <AccountInfo handleEdit={handleEdit} />}
                        {activeTab === 'notifications' && <Notifications />}
                        {activeTab === 'settings' && <Settings />}
                        {(activeTab === 'account' || activeTab === 'settings') && (
                            <div className="account-buttons">
                                <button onClick={handleDeleteAccount} className="delete-button">Delete Account</button>
                                <button onClick={handleBackToHome} className="back-button">Back to Home</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isEditingBio && (
                <>
                    <div className="edit-bio-overlay"></div>
                    <EditBio
                        setIsEditingBio={setIsEditingBio}
                        onCancel={handleCancelEdit}
                    />
                </>
            )}
        </>
    );
};

export default Account;
