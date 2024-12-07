import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FaUser , FaBell } from 'react-icons/fa';
import { BsFillSunFill, BsFillMoonStarsFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import DropDown from '../DropDown/DropDown';
import './Header.css';

const Header = () => {
    const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode
    const [showDropDown, setShowDropDown] = useState(false); // State for dropdown visibility
    const [dropDownPosition, setDropDownPosition] = useState({ top: 0, left: 0 }); // Position of the dropdown
    const [dropdownItems, setDropdownItems] = useState([]); // Items to display in the dropdown
    
    const navigate = useNavigate(); // Hook for navigation

    // Dictionary holding dropdown items for each icon type
    const dropdownItemsDict = useMemo(() => ({
        user: ['Account', 'Logout'],
        bell: ['Notifications', 'Settings'],
        theme: isDarkMode ? ['Light Mode'] : ['Dark Mode'],
    }), [isDarkMode]);

    // Effect to check for saved theme in local storage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        }
    }, []);

    // Handle icon click to show dropdown and set its position
    const handleIconClick = useCallback((iconType, e) => {
        const rect = e.currentTarget.getBoundingClientRect(); // Get the position of the clicked icon
        setDropDownPosition({
            top: rect.bottom + window.scrollY, // Position dropdown below the icon
            left: rect.left, // Align left with the icon
        });
        setDropdownItems(dropdownItemsDict[iconType]); // Set dropdown items based on icon type
        setShowDropDown(prev => !prev); // Toggle dropdown visibility
    }, [dropdownItemsDict]);

    // Handle clicks outside the dropdown to hide it
    const handleClickOutside = useCallback((event) => {
        if (!event.target.closest('.drop-down') && !event.target.closest('.icons')) {
            setShowDropDown(false); // Hide dropdown if clicked outside
        }
    }, []);

    // Effect to add and clean up click event listener for outside clicks
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);

    // Toggle between dark and light mode
    const toggleTheme = useCallback(() => {
        setIsDarkMode(prevState => !prevState);
        localStorage.setItem('theme', isDarkMode ? 'light' : 'dark'); // Save theme to local storage
    }, [isDarkMode]);

    return (
        <>
            <header className={`header-container ${isDarkMode ? 'dark-mode' : ''}`}>
                <h1>BlogsRa</h1>
                <div className="icons">
                    {/* User Icon with dropdown */}
                    <div
                        className="user"
                        onClick={(e) => handleIconClick('user', e)} // Show dropdown for user options
                    >
                        <FaUser/>
                    </div>

                    {/* Notification Icon with dropdown */}
                    <div
                        className="notification"
                        onClick={(e) => handleIconClick('bell', e)} // Show dropdown for notification options
                    >
                        <FaBell />
                        <div className="notification-dot"></div>
                    </div>

                    {/* Theme Toggle Icon */}
                    <div
                        className="theme"
                        onClick={toggleTheme} // Toggle theme on click
                    >
                        {isDarkMode ? <BsFillMoonStarsFill /> : <BsFillSunFill />}
                    </div>
                </div>
            </header>
            <hr />
            {/* Render the dropdown only when showDropDown is true */}
            {showDropDown && (
                <DropDown
                    items={dropdownItems} // Pass the items to the dropdown
                    position={dropDownPosition} // Pass the calculated position
                    onMouseEnter={() => setShowDropDown(true)} // Keep dropdown open when hovering
                    onMouseLeave={() => setShowDropDown(false)} // Hide dropdown when leaving
                />
            )}
        </>
    );
};

export default Header;