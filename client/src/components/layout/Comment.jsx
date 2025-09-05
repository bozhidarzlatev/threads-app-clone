import { Flex, Avatar, Text, Separator } from "@chakra-ui/react"
import { useState } from "react"
import { BsThreeDots } from "react-icons/bs"
import Actions from "./Actions"

export default function Comment({reply, lastReply}) {
    return (
        <>
            <Flex gap={4} py={2} my={2} w={"full"}>
                <Avatar.Root size={"sm"} >
                    <Avatar.Fallback name={reply.username} />
                    <Avatar.Image src={reply.profilePic} />
                </Avatar.Root>
                <Flex gap={1} w={"full"} flexDirection={"column"}>
                    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                        <Text fontSize={"sm"} fontWeight={"bold"}>{reply.username}</Text>

                    </Flex>
                    <Text>{reply.text}</Text>

                </Flex>

            </Flex>
            {!lastReply && <Separator/> }
        </>
    )
}