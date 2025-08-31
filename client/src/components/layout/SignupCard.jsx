import {
    Flex,
    Box,
    HStack,
    Stack,
    Button,
    Heading,
    Text,
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
import { Link, useNavigate } from 'react-router-dom'
import useShowToast from '../../hooks/useShowToast'
import { useUserContext } from '../../contexts/UserContext'

export default function SignupCard() {
    const { userDataHandler } = useUserContext()
    const navigate = useNavigate();
    const showToast = useShowToast()
    const [showPassword, setShowPassword] = useState(false)
    const [inputs, setInputs] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    })


    const handleSignUp = async () => {

        try {

            const res = await fetch("/api/users/signup", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(inputs)
            });
            const data = await res.json();

            if (data.error) {
                showToast(false, data.error)
                
                return
            };
            
            userDataHandler(data);
            showToast(true, `User ${inputs.username} created successfully`);
            
            navigate("/")
        } catch (error) {
            showToast(false, error)
            console.log(error);

        }
    }

    return (
        <Flex
            minH={'50vh'}
            align={'center'}
            justify={'center'}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.400'}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <HStack>
                            <Box>
                                <FormControl id="firstName" isRequired>
                                    <FormLabel>Full name</FormLabel>
                                    <Input type="text"
                                        onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                                        value={inputs.name}
                                    />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="lastName" isRequired>
                                    <FormLabel>Username</FormLabel>
                                    <Input type="text"
                                        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                                        value={inputs.username}
                                    />
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email"
                                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                                value={inputs.email}
                            />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                                    value={inputs.password}
                                    type={showPassword ? 'text' : 'password'} />
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
                                }}
                                onClick={handleSignUp}
                            >
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Flex gap={2}>

                                <Text align={'center'}>
                                    Already a user?
                                </Text>
                                <Link to={"/auth/login"}>
                                    <Text color={'blue.400'}>Login</Text>
                                </Link>
                            </Flex>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}