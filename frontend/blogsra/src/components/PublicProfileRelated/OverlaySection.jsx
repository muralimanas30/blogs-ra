// OverlaySection.js
import React from 'react';
import PropTypes from 'prop-types';
import BlogForm from '../../components/BlogForm/BlogForm';


const OverlaySection = React.memo(({ showOverlay, setShowOverlay, handleNewPostSubmit }) => {
    return (
        showOverlay && (
            <>
            
            <BlogForm
                onClose={() => setShowOverlay(false)}
                onSubmit={handleNewPostSubmit}
                />
            </>
        )
    );
});
OverlaySection.displayName = OverlaySection
// Prop validation
OverlaySection.propTypes = {
    showOverlay: PropTypes.bool.isRequired,
    setShowOverlay: PropTypes.func.isRequired,
    handleNewPostSubmit: PropTypes.func.isRequired,
};

export default OverlaySection;