import { useState } from 'react';
import { useAccountContext } from '../../context/AccountContext';
import { useAuthContext } from '../../context/AuthContext';

const useDeletePost = () => {
    const { deletePost,accountInfo } = useAccountContext();
    const [deleting, setDeleting] = useState(false);
    const {authToken} = useAuthContext()
    
    const handleDelete = async (postId) => {
        setDeleting(true);
        try {
            const response = await deletePost(authToken,accountInfo.user.accountId,postId);
        } catch (err) {
            console.log(err)
        } finally {
            setDeleting(false);
        }
    };

    return { handleDelete, deleting};
};

export default useDeletePost;
