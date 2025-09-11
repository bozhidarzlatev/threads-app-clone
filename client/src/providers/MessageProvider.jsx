import { useState } from "react";
import { MessageContext } from "../contexts/MessageContex";

export default function MessageProvider({ children }) {
    const [messages, setMessages] = useState([])
    const [conversations, setConversationst] = useState([])
    const [selectedConversations, setselectedConversationst] = useState([])

    const messagesDataHandler = (data) => {
        setMessages(data);
    }
    const conversationsDataHandler = (data) => {
        setConversationst(data);
    }
    
    const selectedConversationsDataHandler = (data) => {
        setselectedConversationst(data);
    }
    return (
        <MessageContext.Provider value={{ conversations, conversationsDataHandler, messages, messagesDataHandler,selectedConversations, selectedConversationsDataHandler}}>
            {children}
        </MessageContext.Provider>
    )
};

