import HomeHeader from './Subcomponents/HomeHeader'
import MainContent from '../../components/MainContent/MainContent';
import { LoginHero } from '../../components/LoginHero/LoginHero';
import { useEffect, useState } from 'react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import HomeSearchBox from '../../components/SearchBox/SearchBox';
import { useAuthContext } from '../../context/AuthContext';
import './Home.css'


const Home = () => {
    const { authToken, IP, getIP } = useAuthContext();
    const [trending, setTrending] = useState(false)
    const [tags, setTags] = useState('')

    useEffect(() => {
        if (Object.keys(IP).length === 0) {
            getIP();
        }
    }, [authToken]);

    return (
        <>
            <div className="home-container">
                {authToken ? (
                    <>
                        <HomeHeader feedType={trending} setFeedType={setTrending} tags={tags} setTags={setTags} />
                        <div className="home-feed-container">
                            <MainContent trending={trending} liked={false} tags={tags} />
                        </div>
                    </>
                ) : (
                    <LoginHero />
                )}
            </div>
            <Outlet />
        </>
    );
};

export default Home;
