import { useState } from "react";
import { PostContext } from "../contexts/PostsContex";

export default function PostProvider({ children }) {
    const [posts, setPosts] = useState([])

    const postsDataHandler = (data) => {
        setPosts(data);
    }
    return (
        <PostContext.Provider value={{ posts, setPosts, postsDataHandler }}>
            {children}
        </PostContext.Provider>
    )
};

