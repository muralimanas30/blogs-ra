import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAccountContext } from '../../context/AccountContext';
import { useQueryClient } from '@tanstack/react-query';

function useFetchPosts(authToken, accountId, userId, trending = false, liked = false, tags = '') {
    const [allPosts, setAllPosts] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const { getUserPosts } = useAccountContext();
    const POSTS_PER_PAGE = 4;

    const queryList = accountId?['userPosts', { userId, page: pageNumber }]:['allPosts', pageNumber, trending, liked, tags]
    useEffect(() => {
        setAllPosts([]);
        setPageNumber(1)
        refetch()
    }, [trending, liked, tags, authToken]);

    const { data: fetchedPostsData, isLoading: postsLoading, error, refetch } = useQuery({
        queryKey: queryList,
        queryFn: () => getUserPosts(authToken, accountId, pageNumber, POSTS_PER_PAGE, tags, liked, trending),
        enabled: !!authToken,
        onError: (error) => console.error('Error fetching posts:', error),
    });

    useEffect(() => {
        if (fetchedPostsData?.posts?.length) {
            setAllPosts((prev) => [...prev, ...fetchedPostsData.posts]);
        }
    }, [fetchedPostsData]);

    return { allPosts, setAllPosts, postsLoading, error, refetch, pageNumber, setPageNumber,liked,trending,tags,fetchedPostsData };
}

export default useFetchPosts;
