import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { useMessageContext } from "../../contexts/MessageContex";
import { useUserContext } from "../../contexts/UserContext";
import { BsCheck2All, BsCheck2 } from "react-icons/bs";

export default function Message({ ownMessage, message }) {
    const { selectedConversations } = useMessageContext()
    const { userData } = useUserContext()

    return (

        <>
            {ownMessage ? (


                < Flex
                    gap={2}
                    alignSelf={"flex-end"}
                >
                    {message.text && (
                        <Flex bg={"green.800"} maxW={"350px"} p={1} borderRadius={"md"}>

                            <Text color={"white"}
                            >
                                {message.text}
                            </Text>
                            {message.seen &&
                                <Box alignSelf={"flex-end"} ml={1} color={"white"} fontWeight={"bold"}>
                                    <BsCheck2All />
                                </Box>
                            }
                            {!message.seen &&
                                <Box alignSelf={"flex-end"} ml={1} color={"white"} fontWeight={"bold"}>
                                    <BsCheck2 />
                                </Box>
                            }
                        </Flex>)
                    }

                    {message.img && (
                        <Flex mt={5} w={"200px"}>
                            <Image
                                src={message.img}
                                alt="Message image"
                                borderRadius={4}
                            />
                        </Flex>
                    )}
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

                    {message.text && (

                        <Text maxW={"350px"} bg={"gray.400"}
                            p={1} borderRadius={"md"}
                        >
                            {message.text}
                        </Text>
                    )}
                    {message.img && (
                        <Flex mt={5} w={"200px"}>
                            <Image
                                src={message.img}
                                alt="Message image"
                                borderRadius={4}
                            />
                        </Flex>
                    )}

                </Flex >
            )}
        </>
    )
}