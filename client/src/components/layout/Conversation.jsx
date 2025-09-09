import { Avatar, Badge, Flex, Image, Stack, Text, WrapItem } from "@chakra-ui/react";
import { HiStatusOnline } from "react-icons/hi";


export default function Conversation() {
    return (
        <Flex
            gap={4}
            alignItems={"center"}
            p={"1"}
            _hoer={{
                cursor: "pointer",
                coolor: "white"
            }}
            borderRadius={"md"}
        >
            <WrapItem >
                <Avatar.Root size={{
                    base: "xs",
                    sm: "sm",
                    md: "md"
                }} >
                    <Avatar.Fallback name="Empty User" />
                    <Avatar.Image src="/zuck-avatar.png" />
                </Avatar.Root>
                <Badge 
       
                position={"relative"}
                left={-2}
                top={6}
                variant="solid"  colorPalette="green" borderRadius={"full"}>
                    <HiStatusOnline  />
                </Badge>
            </WrapItem>
            <Stack direction={"column"} fontSize={"sm"}>
                <Text fontWeight={"700"} display={"flex"} alignItems={"center"}>
                    johndoe
                    <Image src="/verified.png" w={4} ml={2} />
                </Text>
                <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>Some message...</Text>

            </Stack>
        </Flex>
    )
}