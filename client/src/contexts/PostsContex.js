import { createContext, useContext } from "react";

export const PostContext = createContext()

export function usePostContext() {
    const data = useContext(PostContext);
    
    return data
}