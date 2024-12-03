import React, { useState, useEffect } from 'react';
import { FaUserAlt, FaBell } from 'react-icons/fa';
import { BsFillSunFill } from 'react-icons/bs';

import './Header.css';

const Header = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme
                === 'dark');
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        localStorage.setItem('theme', isDarkMode
            ? 'dark' : 'light');
    };

    return (
        <>
        <header className={`header-container ${isDarkMode ? 'dark-mode' : ''}`}>
            <h1>BlogsRa</h1>
            <div className="icons">
                <div className="user">
                    <FaUserAlt />
                </div>
                <div className="notification">
                    <FaBell />
                    <div className="notification-dot"></div>
                </div>
                <div className="theme" onClick={toggleTheme}>
                    {isDarkMode ? <BsFillSunFill /> : <BsFillSunFill />}
                </div>
            </div>

        </header>
        <hr />
        </>
    );
};

export default Header;