// OverlayButtons.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'

const OverlayButtons = ({ setShowOverlay }) => {
    const navigate = useNavigate();

    return (
        <div className="open-overlay-button">
            <button onClick={() => navigate('/account')}>Back</button>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Top</button>
            <button onClick={() => setShowOverlay(true)}>Create New Post</button>
        </div>
    );
};

OverlayButtons.propTypes= {
    setShowOverlay:PropTypes.func
}
export default OverlayButtons;