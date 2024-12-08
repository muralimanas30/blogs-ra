import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import './DropDown.css';

const DropDown = forwardRef(({ items, position, onMouseEnter, onMouseLeave }, ref) => {
    const { logout } = useAuthContext();
    const navigate = useNavigate();

    // Handle click events for dropdown items
    const handleClick = (item) => {
        if (item.toLowerCase() === 'logout') {
            logout(); // Perform logout action
            navigate('/'); // Navigate to the login page or home page
            window.location.reload();
        } else if(item.toLowerCase() === 'login'){
            navigate('/login')
        }
        else {
            navigate(`/${item.toLowerCase()}`); // Navigate to other routes
        }
    };

    return (
        <div
            ref={ref} // Assign ref to the dropdown container
            className="drop-down"
            style={{
                top: `${position.top}px`,
                left: `${position.left}px`,
                transform:`translate(-45%,20%)`
            }}
            onMouseEnter={onMouseEnter} // Keep the dropdown open when hovering over it
            onMouseLeave={onMouseLeave} // Hide dropdown when leaving
        >
            <ul className="drop-down-list">
                {items.map((item, index) => (
                    <li
                        key={index}
                        className="drop-down-list-item"
                        onClick={() => handleClick(item)} // Handle item click
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
});

// PropTypes for validating the props
DropDown.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired, // 'items' should be an array of strings
    position: PropTypes.shape({
        top: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
    }).isRequired,
    onMouseEnter: PropTypes.func.isRequired, // Function to handle mouse enter on dropdown
    onMouseLeave: PropTypes.func.isRequired, // Function to handle mouse leave on dropdown
};

DropDown.displayName = 'DropDown';

export default DropDown;

