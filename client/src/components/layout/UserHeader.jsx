import { Avatar, Box, Flex, Text, VStack, Menu, Portal, Button } from "@chakra-ui/react";
import { BsInstagram, } from "react-icons/bs"
import { CgMoreO } from "react-icons/cg";
import { toaster } from "../ui/toaster";
import { useUserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import useShowToast from "../../hooks/useShowToast";

export default function UserHeader({ user }) {
    const { userData } = useUserContext();
    const currentUser = userData;
    const showToast = useShowToast()
    const [follow, setFollow] = useState(user.followers.includes(currentUser?._id))
    const [updating, setUpdating] = useState(false)


    const copyURL = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => {
            console.log("URL is coppied", currentUrl);
        });
        toaster.create({
            title: "Success",
            description: "Profile URL is coppied",
            type: "success",
            duration: 3000,
            closable: true
        })

    }



    const handleFollowUnfollow = async () => {
        if(!currentUser) {
            showToast(false, "Please login to follow")
            return
        }
        setUpdating(true)
        
        if ( updating ) {
            return
        }

        try {
            const res = await fetch(`/api/users/follow/${user._id}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                }
            })

            const data = await res.json();
            if (data.error) {
                showToast(false, data.error)
                return
            };

            if (follow) {
                user.followers.pop()
            } else {
                user.followers.push(userData._id)
            }
            setFollow(!follow);
            showToast(true, data.message);

        } catch (error) {
            showToast(false, data.error)
        } finally {
            setUpdating(false);
            
        }
    }

    

    return (
        <VStack gap={4} alignItems={"start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>
                        {user.name}
                    </Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"}>{user.username}</Text>
                        <Text
                            fontSize={"xs"}
                            bg={"gray.800"}
                            color={"gray.300"}
                            p={1}
                            borderRadius={"full"}>
                            threads.net
                        </Text>
                    </Flex>
                </Box>
                <Box>
                    <Avatar.Root size={
                        {
                            base: "md",
                            md: "2xl"
                        }
                    } >
                        <Avatar.Fallback name={user.name} />
                        <Avatar.Image src={user.profilePic} />
                    </Avatar.Root>
                </Box>
            </Flex>

            <Text>{user.bio}</Text>
            {currentUser?._id === user._id && (
                <Link to={"/auth/update"}>
                    <Button size={"sm"}>Update Profile</Button>
                </Link>
            )}
            {currentUser?._id !== user._id && (

                <Button onClick={handleFollowUnfollow}   size={"sm"} loading={updating}>{updating ? "Loaging..." : follow ? "Unfollow" : "Follow"}</Button>
            )}
            <Flex w={"full"} justifyContent={"space-between"}>

                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.400"}>{user.followers.length} followers</Text>
                    <Box w="1" h="1" bg={"gray.400"} borderRadius={"full"}></Box>
                    <Link color={"gray.400"}>instagram.com</Link>
                </Flex>
                <Flex>
                    <Box className="icon-container">
                        <BsInstagram size={24} cursor={"pointer"} />
                    </Box>
                    <Menu.Root>
                        <Menu.Trigger asChild>
                            <Box className="icon-container">
                                <CgMoreO size={24} cursor={"pointer"} />
                            </Box>
                        </Menu.Trigger>
                        <Portal>
                            <Menu.Positioner>
                                <Menu.Content bg={"gray.800"}>
                                    <Menu.Item value="new-txt" onClick={copyURL}>Copy link</Menu.Item>
                                </Menu.Content>
                            </Menu.Positioner>
                        </Portal>
                    </Menu.Root>
                </Flex>
            </Flex>

            <Flex w={"full"}>
                <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb="3" cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Threads</Text>
                </Flex>
                <Flex flex={1} borderBottom={"1px solid grey"} justifyContent={"center"} color={"gray"} pb="3" cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Replies</Text>
                </Flex>

            </Flex>
        </VStack>
    )
}