import { Flex, Avatar, Text, Separator } from "@chakra-ui/react"
import { useState } from "react"
import { BsThreeDots } from "react-icons/bs"
import Actions from "./Actions"

export default function Comment(data) {
    const [liked, setLiked] = useState(false)
    return (
        <>
            <Flex gap={4} py={2} my={2} w={"full"}>
                <Avatar.Root size={"sm"} >
                    <Avatar.Fallback name="Mark Zukerberg" />
                    <Avatar.Image src={data.userAvatar} />
                </Avatar.Root>
                <Flex gap={1} w={"full"} flexDirection={"column"}>
                    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                        <Text fontSize={"sm"} fontWeight={"bold"}>{data.username}</Text>

                        <Flex gap={2} alignItems={"center"}>
                            <Text fontSize={"sm"} color={"gray.400"}>{data.createdAt}</Text>
                            <BsThreeDots />

                        </Flex>
                    </Flex>
                    <Text>{data.comment}</Text>
                    <Actions liked={liked} setLiked={setLiked} />
                    <text fontSize={"sm"} color="gray.400">
                        {data.likes + (liked ? 1: 0)} likes
                    </text>
                </Flex>

            </Flex>
            <Separator/>
        </>
    )
}