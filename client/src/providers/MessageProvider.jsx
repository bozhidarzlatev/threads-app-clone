import { useState } from "react";
import { MessageContext } from "../contexts/MessageContex";

export default function MessageProvider({ children }) {
    const [conversations, setConversationst] = useState([])
    const [selectedConversations, setselectedConversationst] = useState([])


    const conversationsDataHandler = (data) => {
        setConversationst(data);
    }
    
    const selectedConversationsDataHandler = (data) => {
        setselectedConversationst(data);
    }
    return (
        <MessageContext.Provider value={{ conversations, conversationsDataHandler, selectedConversations, selectedConversationsDataHandler}}>
            {children}
        </MessageContext.Provider>
    )
};

