import { Avatar, Flex, Image, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import { Separator } from "@chakra-ui/react"
import Message from "./Message";


export default function MessageContainer() {
    return (
        <Flex flex={"70"}
        flexDirection={"column"}
            borderRadius={"md"}
            bg={"gray.900"}
            p={2}
        >
            <Flex w={"full"} h={12}
                gap={2}>
                <Avatar.Root size={"sm"} >
                    <Avatar.Fallback name="Empty User" />
                    <Avatar.Image src="" />
                </Avatar.Root>
                <Text fontWeight={"700"} display={"flex"} alignItems={"center"}>
                    johndoe
                    <Image src="/verified.png" w={4} ml={2} />
                </Text>
            </Flex>
            <Separator color={"red.200"} />
            <Flex flexDir={"column"} gap={4} my={4}
            p={2}
            height={"400px"} 
            overflowY={"auto"}
            >
                {true && (
                    [...Array(5)].map((_, i) => (
                        <Flex
                        key={i} 
                        gap={2}
                        alignItems={"center"}
                        p={1}
                        borderRadius={"md"}
                        alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}
                        >
                            {i % 2 === 0 && <SkeletonCircle size={7}/>}
                            <Flex flexDir={"column"} gap={2}>
                                <Skeleton h="8px" w="250px"/>
                                <Skeleton h="8px" w="250px"/>
                                <Skeleton h="8px" w="250px"/>
                            </Flex>
                            {i % 2 !== 0 && <SkeletonCircle size={7}/>}
                        </Flex>

                    ))
                )}

                <Message ownMessage={true} />
                <Message ownMessage={false} />
                <Message ownMessage={true} />
            </Flex>
        </Flex>
    )
}