import { IoIosSend } from "react-icons/io";
import {
  Input,
  InputGroup,

  InputRightElement,
} from "@chakra-ui/input"
import useShowToast from "../../hooks/useShowToast";
import { useMessageContext } from "../../contexts/MessageContex";
import { useState } from "react";

export default function MessageInput({ setMessages }) {
  const [messsageText, setMessageText] = useState("");
  const { selectedConversations, selectedConversationsDataHandler } = useMessageContext()
  const showToast = useShowToast()

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!messsageText) return;

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "applications/json",
        },
        body: JSON.stringify({
          message: messsageText,
          recipiantId: selectedConversations.userId
        })
      });

      const data = await res.json();

      if (data.errot) {
        showToast(false, data.message)
        return;
      }

      setMessages((prev) => [...prev, data])

      selectedConversationsDataHandler(prev => {
        const updConv = prev.map(conversation => {
          if (conversation._id === selectedConversations._id) {
            return {
              ...conversation,
              lastMessage: {
                text: messsageText,
                sender: data.sender
              }
            }
          }
          return conversation
        })
        return updConv;
      })

      setMessageText("")
    } catch (error) {
      showToast(false, error.message)
    }

  }

  return (
    <form style={{ width: "100%" }} onSubmit={handleSendMessage}>
      <InputGroup w="100%">
        <Input
          w="100%"
          placeholder="Type a message"
          pr="3rem"
          onChange={(e) => setMessageText(e.target.value)}
          value={messsageText}
        />
        <InputRightElement onClick={handleSendMessage} cursor={"pointer"}>
          <IoIosSend size={20} />
        </InputRightElement>
      </InputGroup>
    </form>
  )
}