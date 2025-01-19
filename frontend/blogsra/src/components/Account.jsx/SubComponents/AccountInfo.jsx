import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import { useAccountContext } from '../../../context/AccountContext';


const AccountInfo = ({handleEdit }) => {
    const navigate = useNavigate();
    const {authToken} = useAuthContext()
    const {accountInfo} = useAccountContext()
    useEffect(() => {
        // If accountInfo or user is not available, navigate to home page
        if (!authToken || !accountInfo || !accountInfo.user) {
            navigate('/');
        }
    }, [authToken]);

    // If accountInfo or accountInfo.user is still missing, return nothing to avoid rendering
    if (!accountInfo || !accountInfo.user) {
        return null;
    }

    return (
        <div className="account-info">
            {Object.entries({
                Name: accountInfo.user?.name || 'N/A',
                Email: accountInfo.user?.email || 'N/A',
                Bio: accountInfo.user?.bio || 'N/A',
                Posts: accountInfo.user?.blogStats?.posts || 0,
                Followers: accountInfo.user?.blogStats?.followers || 0,
                Following: accountInfo.user?.blogStats?.following || 0,
                'Joined On': accountInfo.user?.createdAt
                    ? new Date(accountInfo.user.createdAt).toLocaleDateString()
                    : 'N/A',
            }).map(([label, value]) => (
                <div key={label} className="info-item">
                    <strong>{label} :</strong> {value}
                </div>
            ))}
            <button onClick={handleEdit}>Edit</button>
            
            
        </div>
    );
};

AccountInfo.propTypes = {
    handleEdit: PropTypes.func.isRequired,
};

export default AccountInfo;
