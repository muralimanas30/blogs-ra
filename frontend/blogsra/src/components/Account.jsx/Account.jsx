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
import BlogsContainer from '../BlogsContainer/BlogsContainer';
const Account = () => {
    /* -------------------------------------------------------------------------- */
    /*                              NECESSARY STATES                              */
    /* -------------------------------------------------------------------------- */

    const navigate = useNavigate();
    const { createAccount, authToken } = useAuthContext();
    const [showConfirm, setShowConfirm] = useState(false);
    const [showTakePassword, setShowTakePassword] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('account');
    const [isEditingBio, setIsEditingBio] = useState(false);
    const imageRef = useRef(null);
    const [accountInfo, setAccountInfo] = useState(JSON.parse(sessionStorage.getItem('accountInfo')))

    /* -------------------------------------------------------------------------- */
    /*    Fetching account information (either from sessionStorage or from API)   */
    /* -------------------------------------------------------------------------- */
    useEffect(() => {

        // If we have data in sessionStorage, we set it directly.
        const storedAccountInfo = sessionStorage.getItem('accountInfo');
        if (!storedAccountInfo) {
            setAccountInfo(JSON.parse(storedAccountInfo));
            setLoading(false);
        }
        // Only fetch account info from API if authToken is available and no data in sessionStorage
        else if (authToken && !accountInfo) { // Check if accountInfo is already loaded
            const fetchAccountInfo = async () => {
                try {
                    const data = await createAccount(authToken);
                    setAccountInfo(data);
                    sessionStorage.setItem('accountInfo', JSON.stringify(data));
                } catch (error) {
                    console.error('Error fetching account info:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchAccountInfo();
        } else {
            setLoading(false); // Stop loading if no authToken and no stored data
        }
    }, [authToken, accountInfo, setAccountInfo, createAccount]); // Only trigger if authToken or accountInfo changes


    /* ------------------------------------ * ----------------------------------- */
    const handleDeleteAccount = async () => setShowConfirm(true);

    const handleBackToHome = () => navigate('/');

    const handleEdit = () => setIsEditingBio(true);

    const handleCancelEdit = () => setIsEditingBio(false); // Close EditBio modal
    if (loading) {
        return <div>Loading...</div>; // Loading state until account data is fetched
    }

    /* ----------------------------------- *** ---------------------------------- */
    /* ----------------------------------- *** ---------------------------------- */
    return (
        <>
            {showConfirm && <AreYouSure setShowConfirm={setShowConfirm} setShowTakePassword={setShowTakePassword} />}
            {showTakePassword && <CustomPopUp shouldDelete={true} setShowTakePassword={setShowTakePassword} />}

            <div className="account-container">
                <div className="account-header">Your Account Information</div>
                <div className="account-wrapper-settings-content">
                    <div className="account-settings">
                        <div className="account-profile-image">
                            <img ref={imageRef}
                                src={accountInfo.user.profilePicture}
                                alt="Profile"
                            />
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
                        {activeTab === 'my blogs' && <BlogsContainer accountInfo={accountInfo}/>}
                        {activeTab === 'account' && <AccountInfo accountInfo={accountInfo} handleEdit={handleEdit} />}
                        {activeTab === 'notifications' && <Notifications />}
                        {activeTab === 'settings' && <Settings />}
                        {
                            (activeTab === 'account' || activeTab ==='settings') && <div className="account-buttons">
                            <button onClick={handleDeleteAccount} className="delete-button">Delete Account</button>
                            <button onClick={handleBackToHome} className="back-button">Back to Home</button>
                        </div>
                        }
                    </div>
                </div>
            </div>

            {isEditingBio && (
                <>
                    <div className="edit-bio-overlay"></div>
                    <EditBio
                        accountInfo={accountInfo}
                        setAccountInfo={setAccountInfo}
                        setIsEditingBio={setIsEditingBio}
                        onCancel={handleCancelEdit}
                    />
                </>
            )}
        </>
    );
};

export default Account;
