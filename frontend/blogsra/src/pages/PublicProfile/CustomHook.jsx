import React, { useState, useCallback } from 'react';
import { useAccountContext } from '../../context/AccountContext';

const useCreatePost = (authToken, accountId,setAllPosts,refetchProfileData) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { createNewPost } = useAccountContext()
    const handleNewPostSubmit = useCallback(async (oldData) => {
        try {
            setLoading(true)
            setError(null)
            const response = await createNewPost(authToken, accountId, oldData);
            if (!response?.data?.success)
                setError(true)
            setAllPosts(prev=>[response?.data?.post,...prev])
            refetchProfileData()
            return response
        }
        catch (er) {
            setError(er.message || 'Some error occured while submitting post')
            return {
                data:{
                    successs:false
                }
            }
        }
        finally {
            setLoading(false)
        }
    }, [authToken, accountId])
    return {
        newPostSubmitting: loading,
        errorInSubmitting: error,
        handleNewPostSubmit
    }
}
export default useCreatePost;
