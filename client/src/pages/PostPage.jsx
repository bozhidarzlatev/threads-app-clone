import { Text, Avatar, Flex, Image, Box, Separator, Button  } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/layout/Actions";
import { useState } from "react";
import Comment from "../components/layout/Comment";

export default function PostPage() {
        const [liked, setLiked] = useState(false)
    return (
        <>
            <Flex>
                <Flex w={"full"} alignItems={"center"} gap={3}>
                    <Avatar.Root size={"md"} >
                        <Avatar.Fallback name="Mark Zukerberg" />
                        <Avatar.Image src="/zuck-avatar.png" />
                    </Avatar.Root>
                    <Flex>
                        <Text fontSize={"sm"} fontWeight={"bold"} >markzuckerberg</Text>
                        <Image src="/verified.png" h={4} ml={1}></Image>

                    </Flex>
                </Flex>
                <Flex gap={4} alignItems={"center"}>
                    <Text fontSize={"sm"} color={"gray.400"}>1d</Text>
                    <BsThreeDots />

                </Flex>
            </Flex>
            <Text my={3}>Let's talk about Threads</Text>
            <Box
                borderRadius={6}
                overflow="hidden"
                border="1px solid"
                borderColor="gray.500"
            >
                <Image src={"/post1.png"} w={"full"}></Image>
            </Box>
            <Flex gap={3} my={3}>
                <Actions liked={liked} setLiked={setLiked}  />
            </Flex>
            <Flex gap={2} alignItems={"center"}>
                <Text color={"gray.400"} fontSize={"sm"}>238 replies</Text>
                <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.400"}></Box>
                <Text color={"gray.400"} fontSize={"sm"}>
                    {1267 + (liked ? 1 : 0)} likes
                    </Text>
            </Flex>
            <Separator my={4} />

            <Flex justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text fontSize={"2xl"}>👋</Text>
                    <Text color={"gray.400"}>Get the app to like, reply and post.</Text>

                </Flex>
                <Button background={"gray.400"}>
                    Get
                </Button>

            </Flex>
            <Separator my={4} />
            <Comment comment="Looks really good" createdAt="2d" likes={69} username="jondoe" userAvatar="https://cdn.myanimelist.net/r/84x124/images/characters/9/131317.webp?s=d4b03c7291407bde303bc0758047f6bd"/>
            <Comment comment="The best app" createdAt="1d" likes={27} username="mamacita" userAvatar="https://cdn.myanimelist.net/r/84x124/images/characters/7/284129.webp?s=a8998bf668767de58b33740886ca571c"/>
            <Comment comment="very nice experiance" createdAt="3d" likes={156} username="zoe468" userAvatar="https://cdn.myanimelist.net/r/84x124/images/characters/9/105421.webp?s=269ff1b2bb9abe3ac1bc443d3a76e863"/>
        </>
    )
}

