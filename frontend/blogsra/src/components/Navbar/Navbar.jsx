import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'
const Navbar = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const activeStyle = {
        fontWeight: 'bold',
        color: 'blueviolet',
        fontSize:'18px'

    };

    return (
        <>
            <div className="nav-container">
                <div className="nav-links">
                    <ul>
                        <li>
                            <Link
                                to="/"
                                style={
                                    currentPath === '/' || currentPath.startsWith('/home')
                                        ? activeStyle
                                        : undefined
                                }
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact-us"
                                style={currentPath === '/contact-us' ? activeStyle : undefined}
                            >
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                style={currentPath === '/about' ? activeStyle : undefined}
                            >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/search"
                                style={currentPath === '/search' ? activeStyle : undefined}
                            >
                                Search
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Navbar;
