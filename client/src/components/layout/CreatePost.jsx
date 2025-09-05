import { FormControl } from "@chakra-ui/form-control";
import {
    Button, CloseButton, Dialog, Flex, Image, Input, Portal,
    Text,
    Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import usePreviewimg from "../../hooks/usePreviewimg";
import { useRef } from "react";
import { BsFillImageFill } from "react-icons/bs";
import { useUserContext } from "../../contexts/UserContext";
import useShowToast from "../../hooks/useShowToast";
import { usePostContext } from "../../contexts/PostsContex";

const MAX_CHAR = 500

export default function CreatePost() {
    const [postText, setPostText] = useState("")
    const { handleimageChange, imgUrl, setImgUrl } = usePreviewimg();
    const fileRef = useRef(null);
    const [remaininChar, setRemainingChar] = useState(MAX_CHAR)
    const { userData } = useUserContext();
    const showToast = useShowToast();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const {posts, postsDataHandler} = usePostContext()

    const handleTextChange = (e) => {
        const inputText = e.target.value;

        if (inputText.length > MAX_CHAR) {
            const truncatedText = inputText.slice(0, MAX_CHAR);
            setPostText(truncatedText);
            setRemainingChar(0)
        } else {
            setPostText(inputText);
            setRemainingChar(MAX_CHAR - inputText.length)
        }
    }

    const handleCreatePost = async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/posts/create", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ postedBy: userData._id, text: postText, img: imgUrl })
            })

            const data = await res.json();


            if (data.error) {
                showToast(false, data.error)
                return
            }

            
            postsDataHandler([data.newPost, ...posts])
            setPostText("");
            setImgUrl("");
            setIsOpen(false);
            showToast(true, "Post successfully crearted!");
        } catch (error) {
            showToast(false, error);
        } finally {
            setLoading(false)
        }


    }

    return (
        <>
            <Dialog.Root
                open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}
                position={'fixed'} bottom={30}>

                <Dialog.Trigger asChild>
                    <Button
                    loading={loading}
                        position={'fixed'}
                        bottom={10}
                        right={10}
                        size="sm">
                        <IoIosAdd />
                        Post
                    </Button>
                </Dialog.Trigger>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content
                        >
                            <Dialog.Header>
                                <Dialog.Title>Create Post</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <FormControl>
                                    <Textarea placeholder="Post Content goes here..."
                                        onChange={handleTextChange}
                                        value={postText}
                                    />
                                    <Text
                                        fontSize={"sm"}
                                        fontWeight={"bold"}
                                        textAlign={"right"}
                                        m={"1"}
                                    >{remaininChar}/{MAX_CHAR}</Text>
                                    <Input
                                        type="file"
                                        hidden
                                        ref={fileRef}
                                        onChange={handleimageChange}
                                    />
                                    <BsFillImageFill
                                        style={{ marginLeft: "5px", cursor: "pointer" }}
                                        size={16}
                                        onClick={() => fileRef.current.click()}
                                    />
                                </FormControl>
                                {imgUrl && (
                                    <Flex mt={5} w={"full"} position={"relative"}>
                                        <Image src={imgUrl} alt='Selected img' />
                                        <CloseButton onClick={() => {
                                            setImgUrl("")
                                        }}
                                            position={"absolute"}
                                            bg={"gray.800"}
                                            color={"white"}
                                            top={2}
                                            right={2}
                                        />

                                    </Flex>
                                )}
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline">Cancel</Button>
                                </Dialog.ActionTrigger>
                                <Button loading={loading} onClick={handleCreatePost}>Post</Button>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    )
}