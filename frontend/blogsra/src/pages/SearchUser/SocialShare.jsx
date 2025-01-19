
import React from 'react';
import './SocialShare.css';
import PropTypes from 'prop-types'

const SocialShare = ({ appLink, message }) => {

    const socialLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${appLink}&quote=${message}`,
        twitter: `https://twitter.com/intent/tweet?url=${appLink}&text=${message}`,
        whatsapp: `https://api.whatsapp.com/send?text=${message} ${appLink}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${appLink}`,
        email: `mailto:?subject=Check out this app&body=${message} ${appLink}`,
    };


    const handleShare = (platform) => {
        window.open(socialLinks[platform], '_blank');
    };

    return (
        <div className="social-share-container">
            <button
                className="social-share-icon"
                onClick={() => handleShare('facebook')}
                aria-label="Share on Facebook"
            >
                <i className="fab fa-facebook-f"></i>
            </button>
            <button
                className="social-share-icon"
                onClick={() => handleShare('twitter')}
                aria-label="Share on Twitter"
            >
                <i className="fab fa-twitter"></i>
            </button>
            <button
                className="social-share-icon"
                onClick={() => handleShare('whatsapp')}
                aria-label="Share on WhatsApp"
            >
                <i className="fab fa-whatsapp"></i>
            </button>
            <button
                className="social-share-icon"
                onClick={() => handleShare('linkedin')}
                aria-label="Share on LinkedIn"
            >
                <i className="fab fa-linkedin-in"></i>
            </button>
            <button
                className="social-share-icon"
                onClick={() => handleShare('email')}
                aria-label="Share via Email"
            >
                <i className="fas fa-envelope"></i>
            </button>
        </div>
    );
};
SocialShare.propTypes = {
    appLink: PropTypes.string,
    message: PropTypes.string,
}

export default SocialShare;
