import { createContext, useEffect, useState } from "react";
import io from "socket.io-client"
import { useUserContext } from "./UserContext";

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({children}) => {
    const [socket, setSocket] = useState(null);
    const { userData } = useUserContext();

    useEffect(()=> {
        const socket = io("http://localhost:5000",{
            query: {
                userId: userData?._id
            }
        })

        setSocket(socket)
        return () => socket && socket.close();
    }, [ userData?._id])

    return (
        <SocketContext.Provider value={"hi"}>
            {children}
        </SocketContext.Provider>
    )
}