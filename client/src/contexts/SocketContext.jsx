import { createContext, useEffect, useState } from "react";
import io from "socket.io-client"
import { useUserContext } from "./UserContext";
import { useContext } from "react";

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({children}) => {
    const [socket, setSocket] = useState(null);
    const { userData } = useUserContext();
    const [onlineUsers, setOnileniUsers] = useState([])

    useEffect(()=> {
        const socket = io("http://localhost:5000",{
            query: {
                userId: userData?._id
            }
        })

        setSocket(socket)

        socket.on("getOnlineUsers", (users) =>{
            setOnileniUsers(users)
        })

        
        return () => socket && socket.close();
    }, [ userData?._id])
    
    console.log(`online users`, onlineUsers);
    return (
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}