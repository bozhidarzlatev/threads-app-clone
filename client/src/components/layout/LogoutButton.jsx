import { Button } from "@chakra-ui/react";
import useShowToast from "../../hooks/useShowToast";
import {FiLogOut} from "react-icons/fi";

export default function LogoutButton() {
    const showToast = useShowToast()
    const handleLogout = async () => {
        // TO ADD CONTEX
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

            localStorage.removeItem("user-threads");
            showToast(true, "User logged out successfully!")
            
        } catch (error) {
            showToast(false, error)
            console.log(error);
        }
    }

    return (
        <Button
            position={"fixed"}
            top={"30px"}
            right={"30px"}
            size={"sm"}
            onClick={handleLogout}>
            <FiLogOut />
        </Button>
    )
}