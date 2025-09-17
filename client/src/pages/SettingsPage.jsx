import { Button, Text } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
import useLogout from "../hooks/useLogout";

export default function SettingsPage() {
    const showToast = useShowToast()
    const { logout } = useLogout()
    const freezeAccount = async () => {
        if (!window.confirm("Are you sure you want to freeze your account?")) return;

        try {

            const res = await fetch(`/api/users/freeze`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" }
            })
            const data = await res.json();

            if (data.error) {
                return showToast(false, data.error)
            }

            if (data.message) {
                await logout();
                showToast(true, data.message);
            }



        } catch (error) {
            showToast(false, error)
        }

    }

    return (
        <>
            <Text my={1}>Freeze your Account?</Text>
            <Text my={1}>You can unfreeze your account anytime by logging in!</Text>
            <Button onClick={freezeAccount} my={1} size={"md"} color={"red"}>Freeze</Button>
        </>
    )
}