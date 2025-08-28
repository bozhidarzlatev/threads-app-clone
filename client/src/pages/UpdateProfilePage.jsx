'use client'

import {
    Button,
    Flex,
    Heading,
    Input,
    Stack,
    HStack,
    Avatar,
    AvatarGroup,
    IconButton,
    Center,
} from '@chakra-ui/react'
// import { SmallCloseIcon } from '@chakra-ui/icons'
import {
    FormControl,
    FormLabel,

} from "@chakra-ui/form-control"
import {
    useColorModeValue,
} from "../components/ui/color-mode"
import { useState } from 'react'


export default function UpdateProfilePage() {
    const [inputs, setInputs] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        bio: ""
    })

    return (
        <Flex
            minH={'50vh'}
            align={'center'}
            justify={'center'}
        //   bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                    User Profile Edit
                </Heading>
                <FormControl id="userName">
                    <FormLabel>User Icon</FormLabel>
                    <Stack direction={['column', 'row']} spacing={6}>
                        <Center>
                            <AvatarGroup>
                                <Avatar.Root size="xl" >
                                    <Avatar.Fallback />
                                    <Avatar.Image src="https://bit.ly/sage-adebayo" />
                                </Avatar.Root>
                            </AvatarGroup>

                        </Center>
                        <Center w="full">
                            <Button w="auto">Change avatar</Button>
                        </Center>
                    </Stack>
                </FormControl>
                <FormControl id="userName" isRequired>
                    <FormLabel>Full name</FormLabel>
                    <Input
                        placeholder="UserName"
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                    />
                </FormControl>
                <FormControl id="userName" isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input
                        placeholder="Username"
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                    />
                </FormControl>
                <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input
                        placeholder="your-email@example.com"
                        _placeholder={{ color: 'gray.500' }}
                        type="email"
                    />
                </FormControl>
                <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                        placeholder="password"
                        _placeholder={{ color: 'gray.500' }}
                        type="password"
                    />
                </FormControl>
                                <FormControl id="email" isRequired>
                    <FormLabel>Bio</FormLabel>
                    <Input
                        placeholder="Bio"
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                    />
                </FormControl>
                <Flex  spacing={6} gap={2} justifyContent={"center"} direction={['column', 'row']}>
                    <Button
                        bg={'red.400'}
                        color={'white'}
                        w="auto"
                        _hover={{
                            bg: 'red.500',
                        }}>
                        Cancel
                    </Button>
                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        w="auto"
                        _hover={{
                            bg: 'blue.500',
                        }}>
                        Submit
                    </Button>
                </Flex>
            </Stack>
        </Flex>
    )
}