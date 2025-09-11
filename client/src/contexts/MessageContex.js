import { createContext, useContext } from "react";

export const MessageContext = createContext()

export function useMessageContext() {
    const data = useContext(MessageContext);
    
    return data
}