import React from 'react';
import './FloatingCard.css'; // Import the CSS file
import PropTypes from 'prop-types'

const FloatingCard = ({ text, onClose }) => {
    return (
        <div className="floating-card__overlay">
            <div className="floating-card__content-card">
                <div className="floating-card__scrollable-content">
                    {text}
                </div>
                <div className="floating-card__footer">
                    <span className="floating-card__scroll-message">Scroll down for more...</span>
                    <button className="floating-card__close-button" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};


FloatingCard.propTypes = {
    text: PropTypes.string,
    onClose: PropTypes.func
}

export default FloatingCard;