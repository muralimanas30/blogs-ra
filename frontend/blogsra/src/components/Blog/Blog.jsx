import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Blog.css';
import { useAccountContext } from '../../context/AccountContext';
import useDeletePost from './CustomHook';
import Loader from '../Loader/Loader';
import FloatingCard from './FloatingCard';
import { useNavigate } from 'react-router-dom';

const Blog = ({ post, setUserPosts, refetch }) => {
    const [isLoading, setIsLoading] = useState(true);
    const { accountInfo } = useAccountContext();
    const { handleDelete, deleting } = useDeletePost();
    const navigate = useNavigate()
    const handleDeleteClick = async () => {
        if (confirm('Are you sure you want to delete this post?')) {
            await handleDelete(post._id)
            setUserPosts(prev => prev.filter(p => p._id !== post._id));
        }
    
    }
    
    return (
        <>
            <div className={`blog-card `}>
                {deleting && (
                    <div className="loader-display-on-top">
                        <Loader text={"Deleting the post"} />
                    </div>
                )}
    
                <div className={`blog-card-header ${deleting && 'deleting'}`}>
                    
                    <span className='user-name' onClick={() => post.profilePicture && navigate(`/user/${post.userId}`)}>
                    <img
                        className="blog-card-profile-pic"
                        src={post.profilePicture || "/default-profile-pic.png"} // Fallback image
                        alt={`${post.name || "User"}'s profile picture`}
                        title={post.name || "User"}
                        onClick={() => post.profilePicture && window.open(post.profilePicture, "_blank")}
                    />{post.name}</span>
                    
                    {accountInfo.user.accountId === post.accountId && (
                        <button className="post-delete-button" onClick={handleDeleteClick} disabled={deleting}>
                            <svg className="post-delete-svgIcon" viewBox="0 0 448 512">
                                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                            </svg>
                        </button>
    
                    )}
                </div>
                <div className={`blog-card-image-container ${deleting && 'deleting'}`}>
                    <img
                        className={`blog-card-image ${isLoading ? 'blur' : 'loaded'}`}
                        src={post.imageUrl}
                        alt={post.title}
                        onLoad={() => setIsLoading(false)}
                        onClick={() => post.imageUrl && window.open(post.imageUrl, "_blank")}
                    />
                </div>
                <div className={`blog-card-content ${deleting && 'deleting'}`}>
                    <h2 className="blog-card-title">{post.title}</h2>
                    <p className="blog-card-description">{post.content}</p>
                    <div className="blog-card-tags">
                        {post.tags.map(tag => (
                            <span className="blog-card-tag" key={tag}>#{tag}</span>
                        ))}
                    </div>
                </div>
                <div className={`blog-card-footer ${deleting && 'deleting'}`}>
                    <button onClick={() => {
                        // handleLike
                        console.log('post liked');
                    }}>
                        <span className="blog-card-likes">❤️ {post.likes} Likes</span>
                    </button>
                    <span className="blog-card-date">
                        {new Date(post.createdAt).toLocaleDateString()}
                        <span>
                            {" at"} <br />
                        </span>
                        {new Date(post.createdAt).toLocaleTimeString()}
                    </span>
                </div>
    
            </div>
        </>
    );
};

Blog.propTypes = {
    post: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        accountId: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        profilePicture: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        imageUrl: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
    }).isRequired,
    setUserPosts: PropTypes.func,
    refetch: PropTypes.func,
};

export default Blog;