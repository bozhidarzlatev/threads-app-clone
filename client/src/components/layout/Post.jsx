import { Flex, Avatar, AvatarGroup, Box, Text, Image } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Actions from "./Actions";
import { useEffect, useState } from "react";
import useShowToast from "../../hooks/useShowToast";
import { formatDistance } from "date-fns"
import { RiDeleteBin6Line  } from "react-icons/ri";
import { useUserContext } from "../../contexts/UserContext";
import { usePostContext } from "../../contexts/PostsContex";

export default function Post({ post, postedBy, setPosts }) {
    const [user, setUser] = useState(null)
    const showToast = useShowToast();
    const navigate = useNavigate()
    const {userData} = useUserContext()
    const {posts, postsDataHandler } = usePostContext()

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch("/api/users/profile/" + postedBy);
                const data = await res.json()
                if (data.error) {
                    showToast(false, data.error);
                    return
                } else {
                    setUser(data)
                }

            } catch (error) {
                setUser(null)
                showToast(false, error);
            }


        }

        getUser()
    }, [postedBy])

    const handleOnDelete = async (e) => {
        try {
            e.preventDefault();

            if(!window.confirm("Are you sure you want to delete tihis post")) return;

            const res = await fetch(`/api/posts/delete/${post._id}`, {
                method:"DELETE"
            });
            const data = await res.json();
            if(data.error) {
                showToast(false, data.error);
                return
            }
            
            postsDataHandler(posts.filter((p) => p._id !== post._id))
            showToast(true, "Post deleted!")

        } catch (error) {
            showToast(false, error)
        }
    }

    

    return (

        <Link to={`/${user?.username}/post/${post._id}`}>
            <Flex gap={3} mb={4} py={5}>
                <Flex flexDirection={"column"} alignItems={"center"}>
                    <Avatar.Root size={"md"} >
                        <Avatar.Fallback name={user?.name} />
                        <Avatar.Image src={user?.profilePic}
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(user.username)
                            }}
                        />
                    </Avatar.Root>
                    <Box w={1} h={"full"} bg="gray.400" my={2}></Box>
                    <Box position={"relative"} w={"full"} pt={"2px"}>
                        <AvatarGroup gap="0" spaceX="-4" size="xs" pt={"2px"} top={"0px"} left={"15px"} mr={2}>
                            {post.replies[0] &&
                                <Avatar.Root>
                                    <Avatar.Fallback name={post?.replies[0]?.name} />
                                    <Avatar.Image src={post?.replies[0]?.userProfilePic} />
                                </Avatar.Root>
                            }
                            {post.replies[1] &&
                                <Avatar.Root>
                                    <Avatar.Fallback name={post?.replies[1]?.name} />
                                    <Avatar.Image src={post?.replies[1]?.userProfilePic} />
                                </Avatar.Root>
                            }
                            {post.replies[2] &&
                                <Avatar.Root>
                                    <Avatar.Fallback name={post?.replies[2]?.name} />
                                    <Avatar.Image src={post?.replies[2]?.userProfilePic} />
                                </Avatar.Root>
                            }

                            {/* <Avatar.Root variant="solid">
                                <Avatar.Fallback>+2</Avatar.Fallback>
                            </Avatar.Root> */}
                        </AvatarGroup>

                    </Box>
                </Flex>
                <Flex flex={1} flexDirection={"column"} gap={2}>
                    <Flex justifyContent={"space-between"} w={"full"}>
                        <Flex w={"full"} alignItems={"center"}>
                            <Text
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(user.username)
                                }}
                                fontSize={"sm"} fontWeight={"bold"}>{user?.username}</Text>
                            <Image src="/verified.png" h={4} ml={1}></Image>
                        </Flex>
                        <Flex gap={4} alignItems={"center"}>
                            <Text fontSize={"sm"} width={36} textAlign={"right"} color={"gray.400"}>{formatDistance( new Date(post.createdAt), new Date() , {addSuffix: true})}</Text>
                            {userData?._id === user?._id &&
                                <RiDeleteBin6Line onClick={handleOnDelete} size={20}/>
                            }
                        </Flex>
                    </Flex>

                    <Text fontSize={"sm"}>{post.text}</Text>
                    {post.img && (


                        <Box
                            borderRadius={6}
                            overflow="hidden"
                            border="1px solid"
                            borderColor="gray.500"
                        >
                            <Image src={post.img} w={"full"}></Image>
                        </Box>
                    )
                    }

                    <Flex gap={3} my={1}>
                        <Actions post={post} ></Actions>
                    </Flex>


                </Flex>
            </Flex>

        </Link>

    )
}