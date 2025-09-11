import { Avatar, Flex, Image, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import { Separator } from "@chakra-ui/react"
import Message from "./Message";
import MessageInput from "./MessageInput";
import { useEffect } from "react";
import useShowToast from "../../hooks/useShowToast";
import { useMessageContext } from "../../contexts/MessageContex";
import { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { useColorMode } from "../ui/color-mode";


export default function MessageContainer() {
    const showToast = useShowToast();
    const { selectedConversations } = useMessageContext();
    const { userData } = useUserContext()
    const [loadingMessages, setLoadingmessages] = useState(true);
    const [messages, setMessages] = useState([]);
    const { colorMode } = useColorMode()
 
    useEffect(() => {
        const getMessages = async () => {
            setMessages([])
            setLoadingmessages(true)

            try {
                const res = await fetch(`/api/messages/${encodeURIComponent(selectedConversations.userId)}`)
                
                const data = await res.json();

                if (data.error) {
                    showToast(false, data.message)
                    return
                }

                setMessages(data);
                
            } catch (error) {
                showToast(false, error.message)
                return
            } finally {
                setLoadingmessages(false)
            }

            

        }

        getMessages();
    }, [selectedConversations])

    console.log(selectedConversations);
    
    return (
        <Flex flex={"70"}
            flexDirection={"column"}
            borderRadius={"md"}
            h={"70dvh"}
            bg={colorMode === "dark" ? "gray.700" : "gray.400"}
            p={2}
        >
            <Flex w={"full"} h={12}
                gap={2}>
                <Avatar.Root size={"sm"} >
                    <Avatar.Fallback name="Empty User" />
                    <Avatar.Image src={selectedConversations.userProfilePic} />
                </Avatar.Root>
                <Text fontWeight={"700"} display={"flex"} alignItems={"center"}>
                    {selectedConversations.username}
                    <Image src="/verified.png" w={4} ml={2} />
                </Text>
            </Flex>
            <Separator color={"red.200"} />
            <Flex flexDir={"column"} gap={4} my={4}
                p={2}
                height={"400px"}
                overflowY={"auto"}
            >
                {loadingMessages && (
                    [...Array(5)].map((_, i) => (
                        <Flex
                            key={i}
                            gap={2}
                            alignItems={"center"}
                            p={1}
                            borderRadius={"md"}
                            alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}
                        >
                            {i % 2 === 0 && <SkeletonCircle size={7} />}
                            <Flex flexDir={"column"} gap={2}>
                                <Skeleton h="8px" w="250px" />
                                <Skeleton h="8px" w="250px" />
                                <Skeleton h="8px" w="250px" />
                            </Flex>
                            {i % 2 !== 0 && <SkeletonCircle size={7} />}
                        </Flex>

                    ))
                )}

                {!loadingMessages && (
                    messages.map((message) => (
                        <Message key={message._id} ownMessage={userData._id === message.sender} message={message} />
                    ))
                )}
            </Flex>
            <MessageInput setMessages={setMessages}/>
        </Flex>
    )
}