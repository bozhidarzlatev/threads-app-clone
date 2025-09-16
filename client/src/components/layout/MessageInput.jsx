import { IoIosSend } from "react-icons/io";
import {
  Input,
  InputGroup,

  InputRightElement,
} from "@chakra-ui/input"
import useShowToast from "../../hooks/useShowToast";
import { useMessageContext } from "../../contexts/MessageContex";
import { useState } from "react";
import { Dialog, Flex, Portal, Button, CloseButton, Image, Text, Textarea, useDisclosure, Spinner, } from "@chakra-ui/react";
import { BsFillImageFill } from "react-icons/bs";
import { FormControl } from "@chakra-ui/form-control";
import { useRef } from "react";
import usePreviewimg from "../../hooks/usePreviewimg";

export default function MessageInput({ setMessages }) {
  const [messageText, setMessageText] = useState("");
  const { selectedConversations, selectedConversationsDataHandler, conversations, conversationsDataHandler } = useMessageContext()
  const showToast = useShowToast()
  const imageRef = useRef(null)
  const [isSending, setIsSending] = useState(false);
  const { handleimageChange, imgUrl, setImgUrl } = usePreviewimg()

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!messageText && !imgUrl) return;
    if(isSending) return;

    setIsSending(true);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          recipientId: selectedConversations.userId,
          img: imgUrl
        })
      });

      const data = await res.json();

      if (data.error) {
        showToast(false, data.error)
        return;
      }

      setMessages((prev) => [...prev, data])

      conversationsDataHandler(prev => {
        const updConv = prev.map(conversation => {
          if (conversation._id === selectedConversations._id) {
            return {
              ...conversation,
              lastMessage: {
                text: messageText,
                sender: data.sender
              }
            }
          }
          return conversation
        })

        return updConv;
      })

      setMessageText("");
      setImgUrl("")
    } catch (error) {
      showToast(false, error.message)
    } finally {
      setIsSending(false)
    }

  }

  return (
    <Flex gap={2} alignItems={"center"}>
      <form
        style={{ width: "100%", flex: 95 }} onSubmit={handleSendMessage}>
        <InputGroup w="100%">
          <Input
            w="100%"
            placeholder="Type a message"
            pr="3rem"
            onChange={(e) => setMessageText(e.target.value)}
            value={messageText}
          />
          <InputRightElement onClick={handleSendMessage} cursor={"pointer"}>
            <IoIosSend size={20} />
          </InputRightElement>
        </InputGroup>
      </form>

      <Flex flex={5} cursor={"pointer"}>
        <BsFillImageFill size={20}
          onClick={() => imageRef.current.click()}
        />
        <Input type={"file"} hidden
          ref={imageRef}
          onChange={handleimageChange}
        />
      </Flex>

      <Dialog.Root
       open={imgUrl}
      //  onOpenChange={(e) => setIsOpen(e.open)}

        position={'fixed'} bottom={30}
      >


        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content
            >
              <Dialog.Header>
              </Dialog.Header>
              <Dialog.Body>

                <Flex mt={5} w={"full"} position={"relative"}>
                  <Image 
                    src={imgUrl}
                  alt='Selected img' 
                  />
                </Flex>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  {!isSending ? (
                  <IoIosSend  size={20} cursor={"pointer"} onClick={handleSendMessage}/>
                  ) : (
                    <Spinner size={"md"}/>
                  )
                }
                </Dialog.ActionTrigger>
                {/* <Button loading={loading} onClick={handleCreatePost}>Post</Button> */}
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" onClick={()=> setImgUrl("")} />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

    </Flex>
  )
}