import { useState } from "react";
import { UserContext } from "../contexts/UserContext";

export default function UserProvider({children}) {
    const [userData , setUserData] = useState(null);

    const userDataHandler = (data) => {
        setUserData(data);
    }
    return (
        <UserContext.Provider value={{userData, userDataHandler}}>
            {children}
        </UserContext.Provider>
    )
};

