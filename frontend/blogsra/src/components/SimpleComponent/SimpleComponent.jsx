import React from 'react'
import './SimpleComponent.css'
import { useNavigate } from 'react-router-dom';
import { useAccountContext } from '../../context/AccountContext';

const SimpleComponent = () => {
    const navigate = useNavigate()
    const { accountInfo } = useAccountContext()

    return (
        <div style={{
            backgroundColor: '#2b3e60', // Dark blue background
            padding: '40px 24px',
            borderRadius: '16px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto',
            color: 'white',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
        }}>
            <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '16px',
                color: '#f1f5f9', // Light grayish text
            }}>
                Visit Your Profile to Get Started
            </h2>
            <p style={{
                fontSize: '16px',
                color: '#cbd5e0',
                marginBottom: '24px',
                lineHeight: '1.6',
                fontWeight: '400',
            }}>
                Access your profile to manage your blogs, upload new content, delete posts, or explore other profiles.
                <br />
                Need to change your password? Head to settings for a quick update.
                <br />
                Want to refresh your bio? Update it anytime in your account settings.
            </p>

            <button
                className="px-4 py-2"
                style={{
                    backgroundColor: '#3182ce',
                    color: 'white',
                    fontWeight: '600',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    border: 'none',
                    transition: 'background-color 0.3s ease',
                }}
                onClick={() => navigate(`/user/${accountInfo.user.userId}`)}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#2b6cb0'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#3182ce'}
            >
                Visit Your Profile
            </button>
        </div>
    );
};

export default SimpleComponent;
