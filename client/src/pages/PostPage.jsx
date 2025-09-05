import { Text, Avatar, Flex, Image, Box, Separator, Button  } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/layout/Actions";
import { useEffect, useState } from "react";
import Comment from "../components/layout/Comment";
import useShowToast from "../hooks/useShowToast";
import useGetUserProfile from "../hooks/useGetUserProfile";
import LoadingSpinner from "../components/layout/LoadingSpinner";
import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import { formatDistance } from "date-fns";
import { useUserContext } from "../contexts/UserContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { usePostContext } from "../contexts/PostsContex";

export default function PostPage() {
    const {user, loading} = useGetUserProfile();
    const [post, setPost] = useState("")
    const {posts, setPosts, postsDataHandler} = usePostContext()
    const showToast = useShowToast();
    const {pid} = useParams()
    const {userData} = useUserContext()
    const navigate= useNavigate() 

    const currentPost = posts[0]
    useEffect(() => {
        
        const getPosts = async () => {
            postsDataHandler([])

            try {
                const res = await fetch(`/api/posts/${pid}`)
                const data = await res.json();

                if(data.error) {
                    showToast(false,data.error)
                    return
                }
                console.log(data);
                
                postsDataHandler([data])
            } catch (error) {
                showToast(false, error)
            }

        }

        getPosts()
    }, [pid])

        const handleOnDelete = async (e) => {
        try {
            e.preventDefault();

            if(!window.confirm("Are you sure you want to delete tihis post")) return;

            const res = await fetch(`/api/posts/delete/${currentPost}`, {
                method:"DELETE"
            });
            const data = await res.json();
            if(data.error) {
                showToast(false, data.error);
                return
            }

            showToast(true, "Post deleted!")
            navigate(`/${user.username}`)
        } catch (error) {
            showToast(false, error)
        }
    } 

    if(!user && loading) {
        return <LoadingSpinner/>
    }

    if(!currentPost) return null

    return (
        <>
            <Flex>
                <Flex w={"full"} alignItems={"center"} gap={3}>
                    <Avatar.Root size={"md"} >
                        <Avatar.Fallback name={user.name} />
                        <Avatar.Image src={user.profilePic} />
                    </Avatar.Root>
                    <Flex>
                        <Text fontSize={"sm"} fontWeight={"bold"} >{user.username}</Text>
                        <Image src="/verified.png" h={4} ml={1}></Image>

                    </Flex>
                </Flex>
                      <Flex gap={4} alignItems={"center"}>
                            <Text fontSize={"sm"} width={36} textAlign={"right"} color={"gray.400"}>{formatDistance( new Date(currentPost.createdAt), new Date() , {addSuffix: true})}</Text>
                            {userData?._id === user?._id &&
                                <RiDeleteBin6Line cursor={"pointer" } onClick={handleOnDelete} size={20}/>
                            }
                        </Flex>
            </Flex>
            <Text my={3}>{currentPost.text}</Text>
            <Box
                borderRadius={6}
                overflow="hidden"
                border="1px solid"
                borderColor="gray.500"
            >
                <Image src={currentPost.img} w={"full"}></Image>
            </Box>
            <Flex gap={3} my={3}>
                <Actions post={currentPost} />
            </Flex>
            {/* <Flex gap={2} alignItems={"center"}>
                <Text color={"gray.400"} fontSize={"sm"}>238 replies</Text>
                <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.400"}></Box>
                <Text color={"gray.400"} fontSize={"sm"}>
                    1267 likes
                    </Text>
            </Flex> */}
            <Separator my={4} />

            <Flex justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text fontSize={"2xl"}>👋</Text>
                    <Text color={"gray.400"}>Get the app to like, reply and posts.</Text>

                </Flex>
                <Button background={"gray.400"}>
                    Get
                </Button>

            </Flex>
            <Separator my={4} />
                {currentPost.replies.map((reply)=> (
                    <Comment key={reply._id} reply={reply} 
                    lastReply = {reply._id === currentPost.replies[currentPost.replies.length -1]._id}
                    />

                ))}
        </>
    )
}

