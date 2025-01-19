import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Blog from '../Blog/Blog';
import './BlogsContainer.css';

const BlogsContainer = ({ userPosts, setUserPosts,refetch }) => {
    return (
        <>
            <div className="blogs-container">
                {userPosts?.length === 0 ? (
                    <p className="blogs-container-message">No blogs have been posted yet.</p>
                ) : (
                    userPosts?.map((item,index) => (
                        <Blog key={index} post={item}  setUserPosts={setUserPosts} refetch={refetch} />
                    ))
                )}
            </div>

        </>
    );
};

BlogsContainer.propTypes = {
    userPosts: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            accountId: PropTypes.string.isRequired,
            userId: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            tags: PropTypes.arrayOf(PropTypes.string).isRequired,
            imageUrl: PropTypes.string.isRequired,
            likes: PropTypes.number.isRequired,
            createdAt: PropTypes.string.isRequired,
            updatedAt: PropTypes.string.isRequired,
        })
    ).isRequired,
    updatePostLikes: PropTypes.func,
    setUserPosts:PropTypes.func,
    refetch:PropTypes.func,
};

export default BlogsContainer;
