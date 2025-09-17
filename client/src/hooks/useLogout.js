import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import useShowToast from "./useShowToast";

const useLogout = () => {
    const showToast = useShowToast();
    const { userDataHandler } = useUserContext();
    const navigate = useNavigate()

    const logout = async () => {
        try {
            const res = await fetch("/api/users/logout", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
            })
            const data = await res.json();

            if (data.error) {
                showToast(false, data.error)
                return
            };

            userDataHandler({})
            showToast(true, "User logged out successfully!")
            navigate("/auth/login")
        } catch (error) {
            showToast(false, error)
        }
    }

    return { logout }

}

export default useLogout