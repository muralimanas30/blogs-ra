import React, { useState } from 'react';
import PropTypes from 'prop-types'

import './MenuButton.css';


const MenuButton = ({open,setOpen}) => {
    return (
        <label className="menuButton" htmlFor="check">
            <input
                type="checkbox"
                id="check"
                checked={open}
                onChange={() => setOpen((prevOpen) => !prevOpen)}
            />
            <span className="top1"></span>
            <span className="mid1"></span>
            <span className="bot1"></span>
        </label>
    );
};

MenuButton.propTypes = {
    open:PropTypes.bool,
    setOpen:PropTypes.func
};

export default MenuButton;
