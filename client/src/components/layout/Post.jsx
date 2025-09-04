import { Flex, Avatar, AvatarGroup, Box, Text, Image } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Actions from "./Actions";
import { useEffect, useState } from "react";
import useShowToast from "../../hooks/useShowToast";
import { formatDistance } from "date-fns"

export default function Post({ post, postedBy }) {
    const [liked, setLiked] = useState(false);
    const [user, setUser] = useState(null)
    const showToast = useShowToast();
    const navigate = useNavigate()

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
                                    <Avatar.Fallback name={post.replies[0].name} />
                                    <Avatar.Image src={post.replies[0].userProfilePic} />
                                </Avatar.Root>
                            }
                            {post.replies[1] &&
                                <Avatar.Root>
                                    <Avatar.Fallback name={post.replies[1].name} />
                                    <Avatar.Image src={post.replies[1].userProfilePic} />
                                </Avatar.Root>
                            }
                            {post.replies[2] &&
                                <Avatar.Root>
                                    <Avatar.Fallback name={post.replies[2].name} />
                                    <Avatar.Image src={post.replies[2].userProfilePic} />
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
                            <Text fontSize={"sm"} color={"gray.400"}>{formatDistance( new Date(post.createdAt), new Date() , {addSuffix: true})}</Text>

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
                        <Actions liked={liked} setLiked={setLiked}></Actions>
                    </Flex>

                    <Flex gap={2} alignItems={"center"} >
                        <Text color="gray.400" fontSize={"sm"}>{post.replies.length} replies</Text>
                        <Box w={0.5} h={0.5} borderRadius={"full"} bg="gray.400"></Box>
                        <Text color="gray.400" fontSize={"sm"}>{post.likes.length} likes</Text>
                    </Flex>
                </Flex>
            </Flex>

        </Link>

    )
}