import { Box, Button, CloseButton, Dialog, Flex, Input, Portal, Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import useShowToast from "../../hooks/useShowToast";
import { useUserContext } from "../../contexts/UserContext";
import { IoIosAdd } from "react-icons/io";
import { FormControl } from "@chakra-ui/form-control";
import { BsFillImageFill } from "react-icons/bs";


export default function Actions({ post: post_ }) {
    const { userData } = useUserContext();
    const [liked, setLiked] = useState(post_?.likes?.includes(userData?._id));
    const showToast = useShowToast();
    const [post, setPost] = useState(post_);
    const [isLiking, setIsLiking] = useState(false);
    const [isReplying, setReplying] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [reply, setReply] = useState("")

    if (!userData) return null

    const handleLikeUnlikePost = async () => {
        if (!userData._id) return showToast(false, "You must be logged on to liek posts!");
        if (isLiking) return
        setIsLiking(true)

        try {
            const res = await fetch("/api/posts/like/" + post._id, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
            })

            const data = await res.json();

            if (data.error) {
                showToast(false, data.error)
            }

            if (!liked) {
                setPost({ ...post, likes: [...post.likes, userData._id] })
            } else {
                setPost({ ...post, likes: post.likes.filter(id => id !== userData._id) })
            }
            setLiked(!liked)
            showToast(true, data.message)
        } catch (error) {
            showToast(true, error)

        } finally {
            setIsLiking(false)
        }
    }

    const onOpen = () => {
        setIsOpen(true)
    }

    const handleReply = async () => {
        if (!userData._id) {
            showToast(false, "You hsould be logged in to reply!")
            return
        }

        setReplying(true)

        try {
            const res = await fetch("/api/posts/reply/" + post._id, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ text: reply })
            })

            const data = await res.json();
            console.log(data);

            if (data.error) return showToast(false, data.error)
            setPost({ ...post, replies: [...post.replies, data.reply] })
            setReply("");
            setIsOpen(false)
            showToast(true, "Reply successfully!")
        } catch (error) {
            showToast(false, error)
        } finally {
            setReplying(false)
        }
    }

    return (
        <Flex gap={1} direction={"column"}>
            <Flex gap={3} my={2} onClick={(e) => e.preventDefault()}>
                <svg
                    cursor={"pointer"}
                    aria-label='Like'
                    color={liked ? "rgb(237, 73, 86)" : ""}
                    fill={liked ? "rgb(237, 73, 86)" : "transparent"}
                    height='19'
                    role='img'
                    viewBox='0 0 24 22'
                    width='20'
                    onClick={handleLikeUnlikePost}
                >
                    <path
                        d='M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z'
                        stroke='currentColor'
                        strokeWidth='2'
                    ></path>
                </svg>

                <svg
                    cursor={"pointer"}
                    aria-label='Comment'
                    color=''
                    fill=''
                    height='20'
                    role='img'
                    viewBox='0 0 24 24'
                    width='20'
                    onClick={onOpen}
                >
                    <title>Comment</title>
                    <path
                        d='M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z'
                        fill='none'
                        stroke='currentColor'
                        strokeLinejoin='round'
                        strokeWidth='2'
                    ></path>
                </svg>


                <RepostSvg />

                <ShareSvg />

            </Flex>
            <Flex gap={2} alignItems={"center"} >
                <Text color="gray.400" fontSize={"sm"}>{post?.replies?.length} replies</Text>
                <Box w={0.5} h={0.5} borderRadius={"full"} bg="gray.400"></Box>
                <Text color="gray.400" fontSize={"sm"}>{post?.likes?.length} likes</Text>
            </Flex>
            <Dialog.Root
                open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}
                position={'fixed'} bottom={30}>

                <Dialog.Trigger asChild>
                    <Button
                        loading={false}
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
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Dialog.Header>
                                <Dialog.Title>Reply to post</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <FormControl>
                                    <Textarea placeholder="Reply here..."
                                        onChange={(e) => setReply(e.target.value)}
                                        value={reply}
                                    />

                                </FormControl>

                            </Dialog.Body>
                            <Dialog.Footer>

                                <Button loading={isReplying}
                                    onClick={handleReply}
                                >Reply</Button>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </Flex>

    )
}

const RepostSvg = () => {

    return (
        <svg
            cursor={"pointer"}
            aria-label='Repost'
            color='currentColor'
            fill='currentColor'
            height='20'
            role='img'
            viewBox='0 0 24 24'
            width='20'
        >
            <title>Repost</title>
            <path
                fill=''
                d='M19.998 9.497a1 1 0 0 0-1 1v4.228a3.274 3.274 0 0 1-3.27 3.27h-5.313l1.791-1.787a1 1 0 0 0-1.412-1.416L7.29 18.287a1.004 1.004 0 0 0-.294.707v.001c0 .023.012.042.013.065a.923.923 0 0 0 .281.643l3.502 3.504a1 1 0 0 0 1.414-1.414l-1.797-1.798h5.318a5.276 5.276 0 0 0 5.27-5.27v-4.228a1 1 0 0 0-1-1Zm-6.41-3.496-1.795 1.795a1 1 0 1 0 1.414 1.414l3.5-3.5a1.003 1.003 0 0 0 0-1.417l-3.5-3.5a1 1 0 0 0-1.414 1.414l1.794 1.794H8.27A5.277 5.277 0 0 0 3 9.271V13.5a1 1 0 0 0 2 0V9.271a3.275 3.275 0 0 1 3.271-3.27Z'
            ></path>
        </svg>
    )
}

const ShareSvg = () => {
    return (
        <svg
            cursor={"pointer"}
            aria-label='Share'
            color=''
            fill='rgb(243, 245, 247)'
            height='20'
            role='img'
            viewBox='0 0 24 24'
            width='20'
        >
            <title>Share</title>
            <line
                fill='none'
                stroke='currentColor'
                strokeLinejoin='round'
                strokeWidth='2'
                x1='22'
                x2='9.218'
                y1='3'
                y2='10.083'
            ></line>
            <polygon
                fill='none'
                points='11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334'
                stroke='currentColor'
                strokeLinejoin='round'
                strokeWidth='2'
            ></polygon>
        </svg>
    )
}