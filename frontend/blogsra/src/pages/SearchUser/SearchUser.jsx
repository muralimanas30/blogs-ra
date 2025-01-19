
import React, { useState, useEffect } from 'react';
import SearchBox from '../../components/SearchBox/SearchBox';
import useSearchBox from '../../components/SearchBox/useSearchBox';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../components/Loader/Loader';
import SocialShare from './SocialShare';
import './SearchUser.css';

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const SearchUser = () => {
    const navigate = useNavigate();
    const { inputValue, setInputValue } = useSearchBox();
    const { backend_domain } = useAuthContext();
    const [searchResult, setSearchResult] = useState([]);
    
    const debouncedValue = useDebounce(inputValue, 500);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['userSearch', debouncedValue],
        queryFn: async () => {
            try {
                const response = await fetch(`${backend_domain}/api/v1/name/${debouncedValue}`);
                const result = await response.json();
                return result.data || [] ;
            } catch (er) {
                return []
            }
        },
        enabled: !!debouncedValue,
    });

    useEffect(() => {
        if (data) {
            setSearchResult(data);
        }
    }, [data]);

    const appLink = 'https://blogsra.netlify.app'; 
    const message = 'Check out this amazing blogs app!';

    return (
        <div className="search-user-container">
            <section className="hero-section">
                <div className="hero-text">
                    <h1>Welcome to the User Search Portal</h1>
                    <p>Find and connect with users from around the world!</p>
                </div>
                <SearchBox setInputValue={setInputValue} />
            </section>

            <div className="search-results">
                {isLoading ? (
                    <Loader /> 
                ) : isError ?  (
                    <div className="blog-header">
                        <span className="user-name">
                            <img
                                className="blog-card-profile-pic"
                                src="https://th.bing.com/th/id/OIP.5PX0DRMwGFFMZk7-uQqP-QAAAA?rs=1&pid=ImgDetMain"
                                alt="No results found"
                            />
                            {!inputValue ? 'Enter a name' : 'No user Found'}
                        </span>
                    </div>
                ) : searchResult.length > 0 ? (
                    searchResult.map((response, index) => (
                        <div className="blog-header" key={index}>
                            <span
                                className="user-name"
                                onClick={() => response.profilePicture && navigate(`/user/${response.userId}`)}
                            >
                                <img
                                    className="blog-card-profile-pic"
                                    src={response.profilePicture || "/default-profile-pic.png"} // Fallback image
                                    alt={`${response.name || "User "}'s profile picture`}
                                    title={response.name || "User "}
                                    onClick={() => response.profilePicture && window.open(response.profilePicture, "_blank")}
                                />
                                {response.name}
                            </span>
                        </div>
                    ))
                ) : (
                    <div className="blog-header">
                        <span className="user-name">
                            <img
                                className="blog-card-profile-pic"
                                src="https://th.bing.com/th/id/OIP.5PX0DRMwGFFMZk7-uQqP-QAAAA?rs=1&pid=ImgDetMain"
                                alt="No results found"
                            />
                            {!inputValue ? 'Enter a name' : 'No user Found'}
                        </span>
                    </div>
                )}
            </div>

            {/* Social Share Section */}
            <div className="social-share-section">
                <h3>Invite your friends to join:</h3>
                <SocialShare appLink={appLink} message={message} />
            </div>
        </div>
    );
};

SearchUser.propTypes = {};

export default SearchUser;
