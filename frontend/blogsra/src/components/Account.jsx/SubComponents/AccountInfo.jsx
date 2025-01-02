import React from 'react';
import PropTypes from 'prop-types';

const AccountInfo = ({ accountInfo,handleEdit }) => {

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
    accountInfo: PropTypes.shape({
        user: PropTypes.shape({
            name: PropTypes.string,
            email: PropTypes.string,
            bio: PropTypes.string,
            createdAt: PropTypes.string,
            blogStats: PropTypes.shape({
                posts: PropTypes.number,
                followers: PropTypes.number,
                following: PropTypes.number,
            }),
        }).isRequired,
    }).isRequired,
    handleEdit: PropTypes.func.isRequired
};

export default AccountInfo;
