import React from 'react';
import PropTypes from 'prop-types';


const LoadMoreButton = ({ onClick }) => {
    return (
<button 
    className="load-more-button" 
    onClick={onClick} 
    style={{
        display: 'block', 
        margin: '20px auto', 
        width: '50%', 
        maxWidth: '500px', 
        minWidth: '200px', 
        padding: '12px 24px', 
        backgroundColor: 'blueviolet   ', 
        color: 'white', 
        borderRadius: '8px', 
        fontSize: '16px', 
        fontWeight: '600', 
        cursor: 'pointer', 
        textAlign: 'center', 
        transition: 'background-color 0.3s ease',
        
    }}
>
    Load More
</button>

    );
};

LoadMoreButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default LoadMoreButton;