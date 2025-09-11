import { useState } from "react";
import UserHeader from "../components/layout/UserHeader";
import UserPost from "../components/layout/UserPost";
import { useEffect } from "react";
import { data, useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/layout/Post";
import useGetUserProfile from "../hooks/useGetUserProfile";
import LoadingSpinner from "../components/layout/LoadingSpinner";
import { usePostContext } from "../contexts/PostsContex";
import CreatePost from "../components/layout/CreatePost";
import { useUserContext } from "../contexts/UserContext";

export default function UserPage() {
    const { username } = useParams();
    const showToast = useShowToast();
    const {posts, setPosts, postsDataHandler} = usePostContext()
    const [fetchPosts, setFetchPosts] = useState(true)
    const {user, loading} = useGetUserProfile();
    const {userData} = useUserContext()


    useEffect(() => {
        const getPosts = async () => {
            setFetchPosts(true)
            postsDataHandler([]);

            try {
                const res = await fetch(`/api/posts/user/${username}`);
                const data = await res.json();

                setPosts(data)

            } catch (error) {
                showToast(false, error)
            } finally {
                setFetchPosts(false)
            }
        }

        getPosts()
    }, [username])
    console.log(posts);
    
    if (!user && loading) {
        return (
            <Flex justifyContent={"center"}>

                <Spinner size={"xl"} />
            </Flex>
        )
    }
    if (!user && !loading) return <h1>User not found!</h1>


    return (
        <>
            <UserHeader user={user} />
            {fetchPosts && <LoadingSpinner/>
            }

            {!fetchPosts && posts.length === 0 && <h1>User has not posted yet!</h1> }
            {posts.map((post) => (
                <Post  key={post._id} post={post} postedBy={post.postedBy} setPosts={setPosts}/>
            ))}
            {userData._id && userData.username === username && <CreatePost/>}
        </>
    )
}