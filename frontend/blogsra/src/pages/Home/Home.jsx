import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Blogs from '../../components/Blogs/Blogs';
import HomeSearchBox from '../../components/SearchBox/SearchBox';
import { useAuthContext } from '../../context/AuthContext';
import './Home.css'
const Home = () => {
    const { authToken } = useAuthContext();
    const navigate = useNavigate();

    return (
        <>
            <div className="home-container">
                {authToken ? (
                    <>
                        <div className="home-header">
                            <p className="home-heading">Welcome Home!</p>
                            <div className="home-nav">
                                <ul className="home-nav-list">
                                    <li>Latest Feed</li>
                                    <li>Trending Feed</li>
                                </ul>
                            </div>
                        </div>

                        <div className="home-feed-container">
                            <HomeSearchBox />
                            <div className="home-feed-container-elements">
                                <Blogs />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="full-screen-login-prompt">
                        <div className="login-prompt-box">
                            <h2 className="login-heading">Welcome to BlogsRa!</h2>
                            <p className="login-text">
                                Unlock access to a world of incredible blogs! By logging in, you can:
                            </p>
                            <ul className="login-benefits">
                                <li>Read the latest articles from a variety of categories</li>
                                <li>Engage with the community through comments</li>
                                <li>Save your favorite blogs and share your own content</li>
                                <li>Get personalized blog recommendations</li>
                            </ul>
                            <button className="login-button" onClick={() => navigate('/login')}>Log In Now</button>
                        </div>
                    </div>
                )}
            </div>

            {/* Render nested routes if any */}
            <Outlet />
        </>
    );
};

export default Home;
