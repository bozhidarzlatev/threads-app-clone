import { UserContext } from "../contexts/UserContext";
import usePersistedState from "../hooks/usePersistedState";

export default function UserProvider({children}) {
    const [userData , setUserData] = usePersistedState("user-threads", {});

    const userDataHandler = (data) => {
        setUserData(data);
    }
    return (
        <UserContext.Provider value={{userData, userDataHandler}}>
            {children}
        </UserContext.Provider>
    )
};

