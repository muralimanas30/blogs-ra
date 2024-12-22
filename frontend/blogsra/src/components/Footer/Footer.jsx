import React from 'react';
import './Footer.css'; // Import the styles
import { useNavigate } from 'react-router-dom';

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
                        <li><a href='/' >Home</a></li>
                        <li><a href="#">Categories</a></li>
                        <li><a href="#">Latest Posts</a></li>
                        <li><a href="#">About</a></li>
                    </ul>
                </div>

                {/* Social Media Section */}
                <div className="footer-column">
                    <h3 className="footer-heading">Follow Us</h3>
                    <ul className="footer-links social-links">
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">Instagram</a></li>
                        <li><a href="#">LinkedIn</a></li>
                    </ul>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} BlogsRa. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
