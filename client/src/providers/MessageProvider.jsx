import { useState } from "react";
import { MessageContext } from "../contexts/MessageContex";

export default function MessageProvider({ children }) {
    const [conversations, setConversations] = useState([])
    const [selectedConversations, setselectedConversationst] = useState([])


    const conversationsDataHandler = (data) => {
        setConversations(data);
    }
    
    const selectedConversationsDataHandler = (data) => {
        setselectedConversationst(data);
    }
    return (
        <MessageContext.Provider value={{ conversations, setConversations , conversationsDataHandler, selectedConversations, selectedConversationsDataHandler}}>
            {children}
        </MessageContext.Provider>
    )
};

