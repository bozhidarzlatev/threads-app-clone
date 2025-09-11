import { Box, Button, Flex, Input, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import { RiSearchFill } from "react-icons/ri";
import Conversation from "../components/layout/Conversation";
import MessageContainer from "../components/layout/MessageContainer";
import { useEffect } from "react";
import useShowToast from "../hooks/useShowToast";
import { useState } from "react";
import { useMessageContext } from "../contexts/MessageContex";
import { GiConversation } from "react-icons/gi";
import { useUserContext } from "../contexts/UserContext";

export default function ChatPage() {
    const showToast = useShowToast();
    const [loadingConversations, setLoadingConversations] = useState(true)
    const { selectedConversations, selectedConversationsDataHandler, conversations, conversationsDataHandler, setConversations } = useMessageContext()
    const [searchText, setSeachText] = useState("");
    const [searchUser, setSearchUser] = useState(false);
    const { userData } = useUserContext();


    useEffect(() => {
        console.log(conversations);
        
        const getConversations = async () => {
            try {
                const res = await fetch("/api/messages/conversations")
                const data = await res.json();

                if (data.error) {
                    showToast(false, data.error)
                    return
                }
                conversationsDataHandler(data)
            } catch (error) {
                showToast(false, error.error)
            } finally {
                setLoadingConversations(false)
            }
        }
        getConversations()
    }, []);

    const handleConversationSearch = async (e) => {
        e.preventDefault();
        setSearchUser(true);

        try {

            if (searchText.length === 0) {
                showToast(false, "Type the user you want to find!");
                return
            }

            const res = await fetch(`/api/users/profile/${encodeURIComponent(searchText)}`);
            const searchedUser = await res.json()


            if (searchedUser.error) {
                showToast(false, searchedUser.error)
                setSearchUser(false)
                return
            }

            const messagingYourself = searchedUser._id === userData._id;

            if (messagingYourself) {
                showToast(false, "You cannto message yourself!")
                return
            }

            const conversationExist = conversations.find(conversation => conversation.participants[0]._id === searchedUser._id);

            if (conversationExist) {
                selectedConversationsDataHandler({
                    _id: conversationExist._id,
                    userId: searchedUser._id,
                    username: searchedUser.username,
                    userProfilePic: searchedUser.profilePic
                });
                return
            }

            const mockConversation = {
                mock: true,
                lastMessage: {
                    text: "",
                    sender: ""
                },
                _id: Date.now(),
                participants: [{
                    _id: searchedUser._id,
                    username: searchedUser.username,
                    profilePic: searchedUser.profilePic
                }]
            };

            conversationsDataHandler((prev) => [...prev, mockConversation])



        } catch (error) {
            showToast(false, error.message)
        } finally {
            setSearchUser("")

        }

    }

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
                    <form onSubmit={handleConversationSearch}>
                        <Flex alignItems={"center"} gap={2}>
                            <Input placeholer={'Search for user'}
                                onChange={(e) => setSeachText(e.target.value)}
                            />
                            <Button
                                size={"sm"}
                                onClick={handleConversationSearch}
                                loading={searchUser}
                            >
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

                    {!loadingConversations && conversations?.length > 0 &&
                        (
                            conversations.map((conversation) => (
                                 <Conversation key={conversation._id} conversation={conversation} /> 
                            )
                            )
                        )
                    }
                </Flex>
                {!selectedConversations._id && (
                    <Flex
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
                    </Flex>
                )}
                {selectedConversations._id &&
                    <MessageContainer />
                }
            </Flex>

        </Box>
    )
}