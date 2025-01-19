import PropTypes from 'prop-types'
import React, { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext'

import useFetchPosts from './Hook';
import Loader from '../Loader/Loader';
import BlogSection from '../PublicProfileRelated/BlogSection';

const MainContent = ({ trending=false,liked=false,tags='' }) => {
    const { authToken } = useAuthContext()
    const POSTS_PER_PAGE = 4
    const { allPosts, setAllPosts, postsLoading, error, refetch, pageNumber,setPageNumber,trending: trendingPosts, fetchedPostsData } = useFetchPosts(authToken, null, null,trending,false,tags)
    
    return (
        <>
        {postsLoading && <Loader text='Posts are loading' />}
        
            <BlogSection
                userPosts={allPosts || []}
                pagination={{
                    currentPage: pageNumber,
                    totalPosts: fetchedPostsData?.pagination?.totalPosts || 0,
                    POSTS_PER_PAGE,
                }}
                refetch={refetch}
                setPageNumber={setPageNumber}
                setUserPosts={setAllPosts}
                />
        </>
    )
}
MainContent.propTypes = {
    trending: PropTypes.bool,
    tags:PropTypes.string,
    liked:PropTypes.bool
}
export default MainContent