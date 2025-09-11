import { Box, Button, Flex, Input, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import { RiSearchFill } from "react-icons/ri";
import Conversation from "../components/layout/Conversation";
import MessageContainer from "../components/layout/MessageContainer";
import { useEffect } from "react";
import useShowToast from "../hooks/useShowToast";
import { useState } from "react";
import { useMessageContext } from "../contexts/MessageContex";

export default function ChatPage() {
    const showToast = useShowToast();
    const [loadingConversations, setLoadingConversations] = useState(true)
    const { conversations, conversationsDataHandler } = useMessageContext()
 
    useEffect(() => {
        
        const getConversations = async () => {
            try {
                const res = await fetch("/api/messages/conversations")
                const data = await res.json();

                if (data.error) {
                    showToast(false, error.message)
                    return
                }
                conversationsDataHandler(data)
            } catch (error) {
                console.log(error);
                
                showToast(false, error.message)
            } finally {
                setLoadingConversations(false)
            }
        }
        getConversations()
    }, [])

    return (
        <Box position={"absolute"}
            lest={"50%"}
            w={{
                base: "100%",
                md: "80%",
                lg: "750px"
            }}
            p={4}
        // transform={"translateX(-50%)"}
        >
            <Flex
                gap={4}
                flexDirection={{
                    base: "columnd",
                    md: "row",
                }}
                maxW={{
                    sm: "400px",
                    md: "full"
                }}
                mx={"auto"}
            >
                <Flex flex={30}
                    gap={2}
                    flexDirection={"column"}
                    maxW={{
                        sm: "250px",
                        md: "full"
                    }}
                    mx={"auto"}
                >
                    <Text fontWeight={700} >Your Conversations</Text>
                    <form>
                        <Flex alignItems={"center"} gap={2}>
                            <Input placeholer={'Search for user'} />
                            <Button size={"sm"}>
                                <RiSearchFill />
                            </Button>
                        </Flex>
                    </form>
                    {loadingConversations && (
                        [0, 1, 2, 3, 4].map((_, i) => (
                            <Flex key={i}
                                gap={4}
                                alignItems={"center"}
                                p={"1"}
                                borderRadius={"md"}
                            >
                                <Box>
                                    <SkeletonCircle size={"10"} />
                                </Box>
                                <Flex w={"full"} flexDirection={"column"} gap={3}>
                                    <Skeleton h={"10px"} w={"80px"} />
                                    <Skeleton h={"8px"} w={"90%"} />
                                </Flex>
                            </Flex>
                        ))
                    )}

                    {!loadingConversations && conversations.length === 0 &&
                        (<h1>No messages yet!</h1>)
                    } 

                    {!loadingConversations && 
                        (conversations.map((conversation) => {
                            <Conversation key={conversation._id} conversation={conversation}/>
                        }))
                    }
                </Flex>
                {/* <Flex
                    flex={70}
                    borderRadius={"md"}
                    p={2}
                    flexDir={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    height={"400px"}
                >
                    <GiConversation size={100} />
                    <Text fontSize={20}>Select a conversations to start messaging</Text>
                </Flex> */}
                <MessageContainer />
            </Flex>

        </Box>
    )
}