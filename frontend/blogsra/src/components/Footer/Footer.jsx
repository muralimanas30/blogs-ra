import React from 'react';
import './Footer.css'; // Import the styles

import { useNavigate, Link } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate()
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* About Section */}
                <div className="footer-column">
                    <h3 className="footer-heading">About BlogsRa</h3>
                    <p>BlogsRa is a professional blog app where writers and creators can share their thoughts, ideas, and stories with the world. Stay tuned for insightful articles!</p>
                </div>

                {/* Quick Links Section */}
                <div className="footer-column">
                    <h3 className="footer-heading">Quick Links</h3>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/categories">Categories</Link></li>
                        <li><Link to="/latest-posts">Latest Posts</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                </div>

                {/* Social Media Section */}
                <div className="footer-column">
                    <h3 className="footer-heading">Follow Us</h3>
                    <ul className="footer-links social-links">
                        <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                        <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                        <li><a href="https://www.instagram.com/murali.manas30" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                        <li><a href="https://www.linkedin.com/in/murali-simhadri" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                    </ul>

                </div>
                <button className="back-to-top" onClick={()=>{window.scroll(0,0)}}>
                    BACK TO TOP ↑
                </button>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} BlogsRa. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
