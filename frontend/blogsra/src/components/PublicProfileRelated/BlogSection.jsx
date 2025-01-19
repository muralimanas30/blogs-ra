import React from 'react';
import PropTypes from 'prop-types';
import BlogsContainer from '../../components/BlogsContainer/BlogsContainer';
import LoadMoreButton from '../../components/PublicProfileRelated/LoadMore';


const POSTS_PER_PAGE = 4;

const BlogSection = React.memo(({ userPosts = [], pagination,setUserPosts, refetch, setPageNumber }) => {
    const loadMorePosts = async () => {
        if (pagination.currentPage * POSTS_PER_PAGE < pagination.totalPosts) {
            setPageNumber((prevPage) => prevPage + 1);  
        }
    };


    return (
        
            <>
                <BlogsContainer userPosts={userPosts} setUserPosts={setUserPosts} refetch={refetch} />
                {pagination.currentPage * POSTS_PER_PAGE < pagination.totalPosts && (
                    <LoadMoreButton onClick={loadMorePosts} /> // Ensure loadMorePosts is passed correctly
                )}
            </>
        
    );
});

BlogSection.propTypes = {
    userPosts: PropTypes.array.isRequired,
    pagination: PropTypes.shape({
        currentPage: PropTypes.number.isRequired,
        totalPosts: PropTypes.number.isRequired,
        POSTS_PER_PAGE: PropTypes.number,
    }).isRequired,
    refetch: PropTypes.func.isRequired,
    showOverlay: PropTypes.bool,
    setShowOverlay: PropTypes.func,
    setPageNumber: PropTypes.func,
    setUserPosts:PropTypes.func
};

export default BlogSection;
BlogSection.displayName = BlogSection