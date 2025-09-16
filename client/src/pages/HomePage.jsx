import { Box, Flex, Spinner, useStatStyles } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/layout/Post";
import { usePostContext } from "../contexts/PostsContex";
import { useUserContext } from "../contexts/UserContext";
import LoadingSpinner from "../components/layout/LoadingSpinner";
import SuggestedUsers from "../components/layout/SuggestedUsers";

export default function HomePage() {
    const showToast = useShowToast();
    const [loading, setLoading] = useState(true);
    const { posts, setPosts, postsDataHandler } = usePostContext();
    const { userData } = useUserContext();



    useEffect(() => {
        setLoading(true);
        const setFeedPosts = async () => {
            postsDataHandler([])
            try {
                const res = await fetch("/api/posts/feed/get");
                const data = await res.json();

                if (data.error) {
                    showToast(false, data.error)
                }
                setPosts(data);

            } catch (error) {
                showToast(false, error)
            } finally {
                setLoading(false)
            }
        }

        setFeedPosts()
    }, [])

    return (
        <Flex gap={10} alignItems={"flex-start"}>

            <Box flex={70}>

                {!userData._id &&
                    <Flex justifyContent={"center"}>
                        <h1>Please login to view content</h1>
                    </Flex>
                }
                {loading && <LoadingSpinner />}
                {!loading && posts.length === 0 &&
                    <h1>Follow some users to see the feed</h1>
                }


                {userData._id && posts?.map((post) => (
                    <Post key={post._id} post={post} postedBy={post.postedBy} />
                ))}
            </Box>
            <Box flex={30} 
            display={{
                base: "none",
                md:"block"
            }}
            >
                <SuggestedUsers />
            </Box>
        </ Flex>
    )
}