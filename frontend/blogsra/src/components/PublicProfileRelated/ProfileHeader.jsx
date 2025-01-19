// ProfileHeader.js
import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader/Loader';

const ProfileHeader = React.memo(({ accountData, error }) => {
    if (error) {
        return <div className="public-account-header text-center">
            <div className="info-item">No Account Found</div>
        </div>;

    }

    if (!accountData) {
        return <Loader />;
    }
    return (
        <div className="public-account-header">
            <div className="info-item">
                <strong>Name:</strong> {accountData.user?.name || 'N/A'}
            </div>
            <div className="info-item">
                <strong>Bio:</strong> {accountData.user?.bio || 'N/A'}
            </div>
            <div className="public-blog-stats">
                <div className="info-item">
                    <strong>Posts:</strong> {accountData.user?.blogStats?.posts || 0}
                </div>
                <div className="info-item">
                    <strong>Followers:</strong> {accountData.user?.blogStats?.followers || 0}
                </div>
                <div className="info-item">
                    <strong>Following:</strong> {accountData.user?.blogStats?.following || 0}
                </div>
            </div>
        </div>
    );
});

// Define PropTypes for the component
ProfileHeader.propTypes = {
    accountData: PropTypes.shape({
        user: PropTypes.shape({
            name: PropTypes.string,
            bio: PropTypes.string,
            blogStats: PropTypes.shape({
                posts: PropTypes.number,
                followers: PropTypes.number,
                following: PropTypes.number,
            }),
        }),
    }),
    error: PropTypes.object,
};
ProfileHeader.displayName = ProfileHeader
export default ProfileHeader;
