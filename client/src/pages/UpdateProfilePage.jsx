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
import { useUserContext } from '../contexts/UserContext'
import { useRef } from 'react'
import usePreviewimg from '../hooks/usePreviewimg'
import { useNavigate } from 'react-router-dom'
import useShowToast from '../hooks/useShowToast'


export default function UpdateProfilePage() {
    const navigate = useNavigate()
    const { userData, userDataHandler } = useUserContext()
    const { handleimageChange, imgUrl } = usePreviewimg();
    const showToast  = useShowToast()
    const [inputs, setInputs] = useState({
        name: userData.name,
        username: userData.username,
        email: userData.email,
        password: "",
        bio: userData.bio,
        profilePic: userData.profilePic,
    })

    const fileRef = useRef(null);



    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        try {
            const res = await fetch(`/api/users/update/${userData._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                }, 
                body: JSON.stringify({...inputs, profilePic: imgUrl})
            });
            const data = await res.json()
            if(data.error) {
                showToast(false, data.error)
            }

            if (data) {
                
                const usrData = {  _id: data.user._id , bio: data.user.bio, email: data.user.email,  name: data.user.name, profilePic: data.user.profilePic, username: data.user.username}
                userDataHandler(usrData)
                showToast(true, "Profile successfully updated");
                navigate("/")
            }

        } catch (error) {
            showToast(false, "Error!")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
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
                                        <Avatar.Fallback name={inputs.name} />
                                        <Avatar.Image src={imgUrl || inputs.profilePic} />
                                    </Avatar.Root>
                                </AvatarGroup>

                            </Center>
                            <Center w="full">
                                <Button w="auto" onClick={() => fileRef.current.click()}>Change avatar</Button>
                                <Input onChange={handleimageChange} type='file' hidden ref={fileRef} />
                            </Center>
                        </Stack>
                    </FormControl>
                    <FormControl >
                        <FormLabel>Full name</FormLabel>
                        <Input
                            value={inputs.name}
                            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                            placeholder="UserName"
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                        />
                    </FormControl>
                    <FormControl >
                        <FormLabel>Username</FormLabel>
                        <Input
                            value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}

                            placeholder="Username"
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                        />
                    </FormControl>
                    <FormControl id="email" >
                        <FormLabel>Email address</FormLabel>
                        <Input
                            value={inputs.email}
                            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                            placeholder="your-email@example.com"
                            _placeholder={{ color: 'gray.500' }}
                            type="email"
                        />
                    </FormControl>
                    <FormControl id="password" >
                        <FormLabel>Password</FormLabel>
                        <Input
                            placeholder="password"
                            _placeholder={{ color: 'gray.500' }}
                            type="password"
                        />
                    </FormControl>
                    <FormControl id="email" >
                        <FormLabel>Bio</FormLabel>
                        <Input
                            value={inputs.bio}
                            onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}

                            placeholder="Bio"
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                        />
                    </FormControl>
                    <Flex spacing={6} gap={2} justifyContent={"center"} direction={['column', 'row']}>
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
                        type='submit'
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
        </form>
    )
}