// Settings.js
import React from 'react';

const Settings = () => {
    return (
        <div className="settings account-info">
            <h2>Settings</h2>

            <div className="settings-section">
                <h4>Change Password</h4>
                <p>To change your password, please contact support.</p>
            </div>

            <div className="settings-section">
                <h4>Email Notifications</h4>
                <p>You are currently subscribed to email notifications.</p>
                <p>You can manage your email preferences in your account settings.</p>
            </div>

            <div className="settings-section">
                <h4>Privacy Settings</h4>
                <p>Your account is currently set to <strong>Public</strong>.</p>
                <p>You can change your privacy settings in your account settings.</p>
            </div>

            <div className="settings-section">
                <h4>Account Management</h4>
                <p>If you wish to delete your account, proceed from below.</p>
            </div>
        </div>
    );
};

export default Settings;