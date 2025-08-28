import { Button } from "@chakra-ui/react";
import useShowToast from "../../hooks/useShowToast";

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

            showToast(true, "User logged out successfully!")

            localStorage.removeItem("user-threads");

            toaster.create({
                title: "Success!",
                description: `Successfully logged out!`,
                type: "success",
                duration: 3000,
                closable: true
            })

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <Button
            position={"fixed"}
            top={"30px"}
            right={"30"}
            size={"sm"}
            onClick={handleLogout}>
            Logout
        </Button>
    )
}