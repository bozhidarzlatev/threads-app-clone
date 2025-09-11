import { Avatar, Badge, Flex, Image, Stack, Text, WrapItem } from "@chakra-ui/react";
import { HiStatusOnline } from "react-icons/hi";
import { useUserContext } from "../../contexts/UserContext";
import { BsCheckAll } from "react-icons/bs";
import { useMessageContext } from "../../contexts/MessageContex";


export default function Conversation({conversation}) {
    const {userData} = useUserContext();
    const {selectedConversations, selectedConversationsDataHandler} = useMessageContext()
    const user = conversation.participants[0];
    const lastMessage = conversation.lastMessage;
    console.log(`conv id`, user._id);
    
        
    return (
        <Flex
            gap={4}
            alignItems={"center"}
            p={"1"}
            _hoer={{
                cursor: "pointer",
                coolor: "white"
            }}
            onClick={() => selectedConversationsDataHandler({
                _id: conversation._id,
                userId: user._id,
                userProfilePic: user.profilePic,
                username: user.username
            }) }
            bg={selectedConversations?._id === conversation._id ? "green.500" : ""}
            borderRadius={"md"}
        >
            <WrapItem >
                <Avatar.Root size={{
                    base: "xs",
                    sm: "sm",
                    md: "md"
                }} >
                    <Avatar.Fallback name="Empty User" />
                    <Avatar.Image src={user.profilePic} />
                </Avatar.Root>
                <Badge

                    position={"relative"}
                    left={-2}
                    top={6}
                    variant="solid" colorPalette="green" borderRadius={"full"}>
                    <HiStatusOnline />
                </Badge>
            </WrapItem>
            <Stack direction={"column"} fontSize={"sm"}>
                <Text fontWeight={"700"} display={"flex"} alignItems={"center"}>
                    {user.username}
                    <Image src="/verified.png" w={4} ml={2} />
                </Text>
                <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
                    {userData._id === lastMessage.sender? <BsCheckAll size={16}/> : ""}
                    {lastMessage.text.length > 18 ? lastMessage.text.substring(0, 18) + '...' : lastMessage.text}</Text>

            </Stack>
        </Flex>
    )
}