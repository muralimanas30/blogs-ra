import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useAccountContext } from '../../context/AccountContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import mongoose from 'mongoose';
import ProfileHeader from '../../components/PublicProfileRelated/ProfileHeader';
import OverlaySection from '../../components/PublicProfileRelated/OverlaySection';
import BlogSection from '../../components/PublicProfileRelated/BlogSection';
import LoginPrompt from '../../components/PublicProfileRelated/LoginPrompt';
import Loader from '../../components/Loader/Loader';
import OverlayButtons from '../../components/PublicProfileRelated/OverlayButtons';
import './PublicProfile.css';
import useCreatePost from './CustomHook';


const POSTS_PER_PAGE = 4;

const PublicProfile = () => {
    const { authToken } = useAuthContext();
    const { accountInfo, getAccountDetails, getUserPosts} = useAccountContext();
    const { userId: paramsUserId } = useParams();

    const navigate = useNavigate()
    const [showOverlay, setShowOverlay] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [allPosts, setAllPosts] = useState([]); // State to store all fetched posts
    
    const isOwnProfile = authToken && paramsUserId === accountInfo?.user?.userId;
    
    const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
    
    const {
        data: fetchedProfileData,
        isLoading: isProfileLoading,
        error: profileError,
        refetch:refetchProfileData
    } = useQuery({
        queryKey: ['accountDetails', { userId: paramsUserId }],
        queryFn: async () => {
            if (!isValidObjectId(paramsUserId)) {
                throw new Error('Invalid userId');
            }
            return getAccountDetails(paramsUserId);
        },
        enabled: !!paramsUserId && isValidObjectId(paramsUserId),
    });
    
    const {newPostSubmitting,handleNewPostSubmit}=useCreatePost(authToken,accountInfo?.user?.accountId,setAllPosts,refetchProfileData)
    
    useEffect(() => {
        setPageNumber(1);
        setAllPosts([]);
    }, [paramsUserId]);
    // Fetch User Posts for the current page
    const {
        data: fetchedPostsData,
        isLoading: postsLoading,
        refetch,
    } = useQuery({
        queryKey: ['userPosts', { userId: paramsUserId, page: pageNumber }],
        queryFn: () => {
            if (!fetchedProfileData) return; // Don't call API until profile is fetched
            return getUserPosts(authToken, fetchedProfileData.user.accountId, pageNumber, POSTS_PER_PAGE,null,null,null);
            // null => tags,liked,trending
        },
        enabled: !!authToken && !!fetchedProfileData,
    });

    

    // Append the fetched posts to the state whenever new data is fetched
    useEffect(() => {
        if (fetchedPostsData) {
            setAllPosts((prevPosts) => [
                ...prevPosts,
                ...fetchedPostsData.posts,
            ]);
        }
    }, [fetchedPostsData]);

    
    if (isProfileLoading) return <Loader />;

    return (
        <div className="public-account">
            <ProfileHeader accountData={fetchedProfileData || {}} error={profileError} />
            {authToken ? (
                <>  {!isOwnProfile && authToken && <div className="open-overlay-button">
                    <button style={{background:'blueviolet'}} onClick={() => { navigate(`/user/${accountInfo?.user.userId}`); }}>To your profile 👆</button>
                </div>}
                    {isOwnProfile && (
                        <>
                            <OverlayButtons setShowOverlay={setShowOverlay} />
                            <OverlaySection
                                showOverlay={showOverlay}
                                setShowOverlay={setShowOverlay}
                                handleNewPostSubmit={handleNewPostSubmit}
                            />
                            {newPostSubmitting&&<Loader text='Creating new Post'/>}
                        </>
                    )}
                    {postsLoading && <Loader />}
                    <BlogSection
                        userPosts={allPosts || []} // Use allPosts here
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
            ) : (
                <LoginPrompt />
            )}
        </div>
    );
};

export default PublicProfile;
