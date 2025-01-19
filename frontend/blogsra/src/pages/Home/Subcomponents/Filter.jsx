import React, { useCallback, useRef } from "react";
import PropTypes from "prop-types";
import "./HomeHeader.css";

const Filter = ({ setFeedType, feedType, tags, setTags }) => {
    const inputElement = useRef(null);

    const memoizedSetFeedType = useCallback(
        (type) => {
            setFeedType(type);
        },
        [setFeedType]
    );

    const handleTagSubmit = () => {
        const inputValue = inputElement?.current?.value + "";
        const tagArray = inputValue
            ?.split(",")
            .map((tag) => tag.trim().replace(/^#/, "")) // Remove leading "#" if present
            .filter((tag) => tag); // Filter out empty tags
        setTags(tagArray.join(",").toLowerCase());
    };

    const isButtonDisabled = () => {
        const tagArray = inputElement?.current?.value
            ?.split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag);
        return tagArray?.length > 3;
    };

    return (

        <>
            
                <ul className="home-header-nav-list">
                    <li
                        className={`home-header-nav-item ${feedType === false ? "home-header-active" : ""}`}
                        onClick={() => memoizedSetFeedType(false)}
                        role="button"
                    >
                        Latest Feed
                    </li>
                    <li
                        className={`home-header-nav-item ${feedType === true ? "home-header-active" : ""}`}
                        onClick={() => memoizedSetFeedType(true)}
                        role="button"
                    >
                        Trending Feed
                    </li>

                    <button
                        className="spl-btnn"
                        onClick={() =>
                            window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: 'smooth', // Smooth scrolling to the top
                            })
                        }
                    >
                        <svg
                            height="1.2em"
                            className="svg-arrow"
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"></path>
                        </svg>
                        <p className="spl-btn-text">Back to Top</p>
                    </button>
                </ul >
            <div className="home-header-tags">
                <input
                    ref={inputElement} // Attach the ref to the input element
                    type="text"
                    placeholder="#random,#meme"
                    className="home-header-tag-input"
                />
                <button
                    onClick={handleTagSubmit}
                    className="home-header-tag-button"
                    disabled={isButtonDisabled()}
                >
                    Set Tags
                </button>
            </div>
        </>
    );
};

Filter.propTypes = {
    setFeedType: PropTypes.func.isRequired,
    feedType: PropTypes.bool,
    tags: PropTypes.string,
    setTags: PropTypes.func.isRequired,
};

export default Filter;
