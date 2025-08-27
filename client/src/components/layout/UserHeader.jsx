import { Avatar, Box, Flex, Link, Text, VStack, Menu, Portal } from "@chakra-ui/react";
import { BsInstagram, } from "react-icons/bs"
import { CgMoreO } from "react-icons/cg";
import {  toaster } from "../ui/toaster";

export default function UserHeader() {
    const copyURL = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => {
            console.log("URL is coppied", currentUrl);
        });
        toaster.create({
            title:"Success",
            description: "Profile URL is coppied",
            type: "success",
            duration: 3000,
            closable: true
        })
        
    }

    return (
        <VStack gap={4} alignItems={"start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>
                        Mark Zuckerberg
                    </Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"}>markzuckerberg</Text>
                        <Text
                            fontSize={{
                                base: "xs",
                                md: "sm",
                                lg: "md"
                            }}
                            bg={"gray.800"}
                            color={"gray.300"}
                            p={1}
                            borderRadius={"full"}>
                            threads.net
                        </Text>
                    </Flex>
                </Box>
                <Box>
                    <Avatar.Root size={
                        {
                            base: "md",
                            md: "2xl"
                        }
                    } >
                        <Avatar.Fallback name="Mark Zukerberg" />
                        <Avatar.Image src="/zuck-avatar.png" />
                    </Avatar.Root>
                </Box>
            </Flex>

            <Text>Co-founder, execative chairman and CEO of Meta Platforms</Text>
            <Flex w={"full"} justifyContent={"space-between"}>

                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.400"}>3.2K followers</Text>
                    <Box w="1" h="1" bg={"gray.400"} borderRadius={"full"}></Box>
                    <Link color={"gray.400"}>instagram.com</Link>
                </Flex>
                <Flex>
                    <Box className="icon-container">
                        <BsInstagram size={24} cursor={"pointer"} />
                    </Box>
                    <Menu.Root>
                        <Menu.Trigger asChild>
                            <Box className="icon-container">
                                <CgMoreO size={24} cursor={"pointer"} />
                            </Box>
                        </Menu.Trigger>
                        <Portal>
                            <Menu.Positioner>
                                <Menu.Content bg={"gray.800"}>
                                    <Menu.Item value="new-txt" onClick={copyURL}>Copy link</Menu.Item>
                                </Menu.Content>
                            </Menu.Positioner>
                        </Portal>
                    </Menu.Root>
                </Flex>
            </Flex>

            <Flex w={"full"}>
                <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb="3" cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Threads</Text>
                </Flex>
                <Flex flex={1} borderBottom={"1px solid grey"} justifyContent={"center"} color={"gray"} pb="3" cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Replies</Text>
                </Flex>

            </Flex>
        </VStack>
    )
}