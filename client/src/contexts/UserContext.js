import { createContext, useContext } from "react";

export const UserContext = createContext()

export function useUserContext() {
    const data = useContext(UserContext);
    
    return data
}