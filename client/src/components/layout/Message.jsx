import { Avatar, Flex, Text } from "@chakra-ui/react";

export default function Message({ ownMessage }) {
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.  
                    </Text>
                    <Avatar.Root w={7} h={7} >
                        <Avatar.Fallback name="Empty User" />
                        <Avatar.Image src="" />
                    </Avatar.Root>

                </Flex >
            ) : (
                
                < Flex
                    gap={2}
                >
                    <Avatar.Root w={7} h={7} >
                        <Avatar.Fallback name="Empty User" />
                        <Avatar.Image src="" />
                    </Avatar.Root>
                    <Text maxW={"350px"} bg={"gray.400"}
                        p={1} borderRadius={"md"}
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quos cupiditate est modi assumenda repellat voluptatibus? 
                    </Text>

                </Flex >
            )}
        </>
    )
}