import { Avatar, Button, Flex } from "@chakra-ui/react";
import useShowToast from "../../hooks/useShowToast";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { GrUserNew } from "react-icons/gr";
import { useUserContext } from "../../contexts/UserContext";
import { data, Link } from "react-router-dom";

export default function NavigateButtons() {
    const { userDataHandler, userData } = useUserContext()
    const showToast = useShowToast()

    console.log(userData);

    const handleLogout = async () => {
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

        } catch (error) {
            showToast(false, error)
            console.log(error);
        }
    }

    return (
        <>
            {userData._id ? (
                <Flex gap={2} position="fixed" top="30px" right="30px">
<Avatar.Root 
    size="md" 
    borderWidth="3px" 
    borderColor="green.400"
    borderRadius={"full"}
>
    <Avatar.Fallback name={userData.name} />
    <Avatar.Image src={userData.profilePic} />
</Avatar.Root>
                    <Button
                        bg={"red.200"}
                        size={"sm"}
                        onClick={handleLogout}>
                        <FiLogOut /> Logout
                    </Button>
                </Flex>
            ) : (
                <Flex gap={2} position="fixed" top="30px" right="30px">
                    <Link to={"/auth/login"}>
                        <Button
                            bg={"green.400"}
                            size={"sm"}
                        >
                            <FiLogIn /> LogIn
                        </Button>
                    </Link>
                    <Link to={"/auth/signup"}>
                        <Button
                            bg={"blue.400"}
                            size={"sm"}
                        >
                            <GrUserNew /> Register
                        </Button>
                    </Link>
                </Flex>
            )
            }

        </>
    )
}