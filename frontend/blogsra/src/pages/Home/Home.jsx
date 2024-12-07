import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Blogs from '../../components/Blogs/Blogs';
import HomeSearchBox from '../../components/SearchBox/SearchBox';
import { useAuthContext } from '../../context/AuthContext';

const Home = () => {
    const { authToken } = useAuthContext();
    const navigate = useNavigate();

    return (
        <>
            <div className='home-container'>
                {authToken ? (<>
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
                    <div className='home-feed-container'>
                        <div className='login-prompt-box'>
                            <p>You need to log in to continue</p>
                            <button onClick={() => navigate('/login')}>Go to Login</button>
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
