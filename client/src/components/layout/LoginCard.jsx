import {
    Flex,
    Box,
    HStack,
    Stack,
    Button,
    Heading,
    Text,
    VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
// import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
    FormControl,
    FormLabel,

} from "@chakra-ui/form-control"
import {
    useColorModeValue,
} from "../ui/color-mode"

import {
    Input,
    InputGroup,

    InputRightElement,
} from "@chakra-ui/input"
import { Link } from 'react-router-dom'

export default function LoginCard() {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <Flex
            minH={'50vh'}
            align={'center'}
            justify={'center'}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Login
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.400'}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                    w={{
                        base: "full",
                        sm: "400px"
                    }}
                >
                    <Stack spacing={4}>

                        <FormControl id="email" isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input type="text" />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                        {/* {showPassword ? <ViewIcon /> : <ViewOffIcon />} */}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Login
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Link to={"/auth/signup"}>
                                <Flex gap={2}>

                                    <Text align={'center'}>
                                        Don't have an account?
                                    </Text>
                                    <Text color={'blue.400'}>Sign up</Text>
                                </Flex>
                            </Link>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}