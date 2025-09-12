import { Flex, Avatar, AvatarGroup, Box, Text, Image } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import Actions from "./Actions";
import { useState } from "react";

export default function UserPost({ likes, replies, postImg, postTitle }) {
    const [liked, setLiked] = useState(false)

    return (
        <Link to="/markzuckerberg/post/1">
            <Flex gap={3} mb={4} py={5}>
                <Flex flexDirection={"column"} alignItems={"center"}>
                    <Avatar.Root size={"md"} >
                        <Avatar.Fallback name="Mark Zukerberg" />
                        <Avatar.Image src="/zuck-avatar.png" />
                    </Avatar.Root>
                    <Box w={1} h={"full"} bg="gray.400" my={2}></Box>
                    <Box position={"relative"} w={"full"} pt={"2px"}>

                        <AvatarGroup gap="0" spaceX="-4" size="xs" pt={"2px"} top={"0px"} left={"15px"} mr={2}>
                            <Avatar.Root>
                                <Avatar.Fallback name="Uchiha Sasuke" />
                                <Avatar.Image src="https://cdn.myanimelist.net/r/84x124/images/characters/9/131317.webp?s=d4b03c7291407bde303bc0758047f6bd" />
                            </Avatar.Root>

                            <Avatar.Root>
                                <Avatar.Fallback name="Baki Ani" />
                                <Avatar.Image src="https://cdn.myanimelist.net/r/84x124/images/characters/7/284129.webp?s=a8998bf668767de58b33740886ca571c" />
                            </Avatar.Root>

                            <Avatar.Root>
                                <Avatar.Fallback name="Uchiha Chan" />
                                <Avatar.Image src="https://cdn.myanimelist.net/r/84x124/images/characters/9/105421.webp?s=269ff1b2bb9abe3ac1bc443d3a76e863" />
                            </Avatar.Root>
                            {/* <Avatar.Root variant="solid">
                                <Avatar.Fallback>+2</Avatar.Fallback>
                            </Avatar.Root> */}
                        </AvatarGroup>
                    </Box>
                </Flex>
                <Flex flex={1} flexDirection={"column"} gap={2}>
                    <Flex justifyContent={"space-between"} w={"full"}>
                        <Flex w={"full"} alignItems={"center"}>
                            <Text fontSize={"sm"} fontWeight={"bold"}>markzuckerberg</Text>
                            <Image src="/verified.png" h={4} ml={1}></Image>
                        </Flex>
                        <Flex gap={4} alignItems={"center"}>
                            <Text fontSize={"sm"} color={"gray.400"}>1d</Text>
                            <BsThreeDots />

                        </Flex>
                    </Flex>
                    <Text fontSize={"sm"}>{postTitle}</Text>
                    {postImg && (


                        <Box
                            borderRadius={6}
                            overflow="hidden"
                            border="1px solid"
                            borderColor="gray.500"
                        >
                            <Image src={postImg} w={"full"}></Image>
                        </Box>
                    )
                    }

                    <Flex gap={3} my={1}>
                        <Actions liked={liked} setLiked={setLiked}></Actions>
                    </Flex>

                    <Flex gap={2} alignItems={"center"} >
                        <Text color="gray.400" fontSize={"sm"}>{replies} replies</Text>
                        <Box w={0.5} h={0.5} borderRadius={"full"} bg="gray.400"></Box>
                        <Text color="gray.400" fontSize={"sm"}>{likes} likes</Text>
                    </Flex>
                </Flex>
            </Flex>

        </Link>
        
    )
}