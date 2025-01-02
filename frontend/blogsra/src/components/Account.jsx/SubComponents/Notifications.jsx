// Notifications.js
import React from 'react';

const Notifications = () => {
    const notifications = [
        "Notification 1: You have a new follower.",
        "Notification 2: Your post has been liked.",
        "Notification 3: You have a new message."
    ];

    return (
        <div className="notifications account-info">
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification}</li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;