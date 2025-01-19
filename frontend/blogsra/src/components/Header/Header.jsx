import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FaUser, FaBell } from 'react-icons/fa';
import { BsFillSunFill, BsFillMoonStarsFill } from 'react-icons/bs';
import { useRef } from 'react';
import DropDown from '../DropDown/DropDown';
import './Header.css';
import { useAuthContext } from '../../context/AuthContext';

const Header = () => {


    const { authToken } = useAuthContext()
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);
    const [dropDownPosition, setDropDownPosition] = useState({ top: 0, left: 0 });
    const [dropdownItems, setDropdownItems] = useState([]);

    const logoRef = useRef(null);



    const dropdownItemsDict = useMemo(() => ({
        user: ['Account', 'My Blogs', 'Logout'],
        bell: ['Notifications', 'Settings'],
        theme: isDarkMode ? ['Light Mode'] : ['Dark Mode'],
    }), [isDarkMode]);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        }
    }, []);


    const handleIconClick = useCallback((iconType, e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setDropDownPosition({
            top: rect.bottom + window.scrollY, // Position dropdown below the icon
            left: rect.left,
        });
        setDropdownItems(dropdownItemsDict[iconType]);
        setShowDropDown(prev => !prev); // Toggle dropdown visibility
    }, [dropdownItemsDict]);


    const handleClickOutside = useCallback((event) => {
        if (!event.target.closest('.drop-down') && !event.target.closest('.icons')) {
            setShowDropDown(false); // Hide dropdown if clicked outside
        }
    }, []);


    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);


    const toggleTheme = useCallback(() => {
        setIsDarkMode(prevState => !prevState);
        localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
    }, [isDarkMode]);

    return (
        <>
            <header className={`header-container ${isDarkMode ? 'dark-mode' : ''}`}>
                <h1 ref={logoRef} className='blogsra-logo' id='blogaraLogo'>BlogsRa</h1>
                <div className="icons">
                    {authToken == null ? null : <>
                        <div
                            className="user"
                            onClick={(e) => handleIconClick('user', e)}
                        >
                            <FaUser />
                        </div>
                    </>
                    }
                    {/* <div
                        className="theme"
                        onClick={toggleTheme}
                    >
                        {isDarkMode ? <BsFillMoonStarsFill /> : <BsFillSunFill />}
                    </div> */}
                </div>
            </header>
            <div className="marquee">
                <span>First request might take 50 seconds.
                    Thankyou for your patience
                </span>
            </div>


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