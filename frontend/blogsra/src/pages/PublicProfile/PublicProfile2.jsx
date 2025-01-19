
import { useNavigate } from 'react-router-dom';
import mongoose from 'mongoose';
import ProfileHeader from '../../components/PublicProfileRelated/ProfileHeader';
import OverlaySection from '../../components/PublicProfileRelated/OverlaySection';
import BlogSection from '../../components/PublicProfileRelated/BlogSection';

import LoginPrompt from '../../components/PublicProfileRelated/LoginPrompt';
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import './PublicProfile.css';
import { useAccountContext } from '../../context/AccountContext';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import OverlayButtons from '../../components/PublicProfileRelated/OverlayButtons';

const POSTS_PER_PAGE = 4;

const PublicProfile = () => {

    const navigate = useNavigate();
    const { authToken } = useAuthContext();
    const { createAccount, createNewPost, accountInfo, setAccountInfo, getAccountDetails, getUserPosts } = useAccountContext();
    const [userPosts, setUserPosts] = useState([]);
    const [currentUserInfo, setCurrentUserInfo] = useState(null);
    const [currentUserPosts, setCurrentUserPosts] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(false);

    const { userId: paramsUserId } = useParams();
    const isOwnProfile = authToken && paramsUserId === accountInfo?.user?.userId;

    const [showOverlay, setShowOverlay] = useState(false);

    const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

    console.log(paramsUserId, " ", accountInfo?.user?.userId)
    console.log(isOwnProfile)
    const { data: profileData, isLoading: isProfileLoading, error } = useQuery({
        queryKey: ['accountDetails', paramsUserId],
        queryFn: async () => {
            if (!isValidObjectId(paramsUserId)) {
                throw new Error('Invalid user ID');
            }
            // return authToken ? createAccount(authToken) : getAccountDetails(paramsUserId);
            if (!accountInfo && authToken)
                await createAccount(authToken)
            return getAccountDetails(paramsUserId)
        },
        enabled: !!paramsUserId && isValidObjectId(paramsUserId),
    });

    useEffect(() => {
        if (profileData) {
            if (isOwnProfile) {
                setAccountInfo(profileData);
                setCurrentUserInfo(profileData);
            } else {
                setCurrentUserInfo(profileData);
                console.log("other user")
            }
        }
    }, [profileData]);

    const fetchUserPosts = async (page = 1) => {
        console.log("fetch usr post")
        if (!authToken || !isValidObjectId(paramsUserId)) return;
        try {
            setLoading(true);
            const accountId = isOwnProfile
                ? accountInfo?.user?.accountId
                : currentUserInfo?.user?.accountId;

            const data = await getUserPosts(authToken, accountId, page, POSTS_PER_PAGE);

            setPagination({
                currentPage: Number(data.pagination.currentPage),
                totalPosts: Number(data.pagination.totalPosts),
                totalPages: Number(data.pagination.totalPages),
                limit: Number(data.pagination.limit),
                POSTS_PER_PAGE:POSTS_PER_PAGE
            });
            const updatePosts = page === 1 ? data.posts : [...(isOwnProfile ? userPosts : currentUserPosts), ...data.posts];
            isOwnProfile ? setUserPosts(updatePosts) : setCurrentUserPosts(updatePosts);
        } catch (err) {
            console.error('Failed to fetch posts:', err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (authToken && accountInfo) {
            fetchUserPosts();
        }
    }, [authToken, isOwnProfile,currentUserInfo]);

    const handleNewPostSubmit = async (postData) => {
        try {
            const response = await createNewPost(authToken, accountInfo.user.accountId, postData);
            if (response?.data?.success) {
                const newPost = response.data.post;
                setUserPosts((prevPosts) => [
                    { ...newPost, createdAt: new Date().toISOString() },
                    ...prevPosts,
                ]);
            } else {
                console.error('Failed to create new post.');
            }
        } catch (error) {
            console.error('Error creating new post:', error);
        }
    };

    if (isProfileLoading) return <Loader />;
    if (error) return <p>User not found.</p>;

    return (
        <div className="public-account">
            <ProfileHeader accountData={isOwnProfile ? accountInfo || {} : currentUserInfo || {}} error={error} />
            {authToken ? (
                <>
                    {isOwnProfile && (
                        <>
                            <OverlayButtons setShowOverlay={setShowOverlay} />
                            <OverlaySection showOverlay={showOverlay} setShowOverlay={setShowOverlay} handleNewPostSubmit={handleNewPostSubmit} />
                        </>
                    )}

                    <BlogSection
                        authToken={authToken}
                        isOwnProfile={isOwnProfile}
                        accountInfo={accountInfo}
                        currentUserInfo={currentUserInfo || {}}
                        userPosts={userPosts}
                        setUserPosts={setUserPosts}
                        currentUserPosts={currentUserPosts}
                        setCurrentUserPosts={setCurrentUserPosts}
                        pagination={pagination}
                        fetchUserPosts={fetchUserPosts}
                    />
                </>
            ) : (
                <LoginPrompt />
            )}
        </div>
    );
};

export default PublicProfile;
