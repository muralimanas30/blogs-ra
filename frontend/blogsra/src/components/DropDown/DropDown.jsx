import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import './DropDown.css';

const DropDown = forwardRef(({ items, position, onMouseEnter, onMouseLeave }, ref) => {
    const {user} = useAuthContext()
    const { logout } = useAuthContext();
    const navigate = useNavigate();

    // Handle click events for dropdown items
    const handleClick = (item) => {
        if (item.toLowerCase() === 'logout') {
            logout(); 
        
        } else if(item.toLowerCase() === 'login'){
            navigate('/login')
        }
        else if(item.toLowerCase().trim() === 'my blogs'){
            navigate(`/user/${user.userId}`)
        }
        else {
            navigate(`/${item.toLowerCase()}`); 
        }
    };

    return (
        <div
            ref={ref}
            className="drop-down"
            style={{
                top: `${position.top}px`,
                left: `${position.left}px`,
                transform:`translate(-60%,40%)`
            }}
            onMouseEnter={onMouseEnter} 
            onMouseLeave={onMouseLeave} 
        >
            <ul className="drop-down-list">
                {items.map((item, index) => (
                    <li
                        key={index}
                        className="drop-down-list-item"
                        onClick={() => handleClick(item)} 
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
});


DropDown.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    position: PropTypes.shape({
        top: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
    }).isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
};

DropDown.displayName = 'DropDown';

export default DropDown;

