import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useMessageContext } from "../../contexts/MessageContex";
import { useUserContext } from "../../contexts/UserContext";

export default function Message({ ownMessage, message }) {
    const {selectedConversations} = useMessageContext()
    const {userData} = useUserContext()

    return (

        <>
            {ownMessage ? (


                < Flex
                    gap={2}
                    alignSelf={"flex-end"}
                >
                    <Text maxW={"350px"} bg={"blue.400"}
                        p={1} borderRadius={"md"}
                    >
                        {message.text}  
                    </Text>
                    <Avatar.Root w={7} h={7} >
                        <Avatar.Fallback name="Empty User" />
                        <Avatar.Image src={userData.profilePic} />
                    </Avatar.Root>

                </Flex >
            ) : (
                
                < Flex
                    gap={2}
                >
                    <Avatar.Root w={7} h={7} >
                        <Avatar.Fallback name="Empty User" />
                        <Avatar.Image src={selectedConversations.userProfilePic} />
                    </Avatar.Root>
                    <Text maxW={"350px"} bg={"gray.400"}
                        p={1} borderRadius={"md"}
                    >
                        {message.text} 
                    </Text>

                </Flex >
            )}
        </>
    )
}