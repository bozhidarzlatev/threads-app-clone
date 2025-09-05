import { useColorMode } from "../ui/color-mode";
import { useUserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { Avatar, Button, Flex, Image } from "@chakra-ui/react";
import useShowToast from "../../hooks/useShowToast";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { GrUserNew } from "react-icons/gr";

export default function Header() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { userDataHandler, userData } = useUserContext()
    const showToast = useShowToast()

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
        }
    }

    return (

        <>
            <Flex justifyContent={"space-between"} mt={6} mb="12">
                {userData._id && (
                    <Link to={"/"}>
                        <IoMdHome size={42} />
                    </Link>
                )}

                {!userData._id &&
                    <Link to={"/auth/login"}>
                        <Button
                            borderRadius={"full"}
                            w={10}
                            h={10}
                            bg={"green.400"}
                            size={"sm"}
                        >
                            <FiLogIn />
                        </Button>
                    </Link>
                }

                <Image
                    cursor={"pointer"}
                    alt='logo'
                    w={8}
                    src={colorMode === "dark" ? "logo_light.png" : "logo_dark.png"}
                    onClick={toggleColorMode}
                />
                {userData._id ? (
                    <Flex gap={2} >
                        <Link to={`/${userData.username}`}>
                            <Avatar.Root
                                size="md"
                                borderWidth="3px"
                                borderColor="green.400"
                                borderRadius={"full"}
                            >
                                <Avatar.Fallback name={userData.name} />
                                <Avatar.Image src={userData.profilePic} />
                            </Avatar.Root>
                        </Link>
                        <Button
                            borderRadius={"full"}
                            w={10}
                            h={10}
                            bg={"red.200"}
                            size={"sm"}
                            onClick={handleLogout}>
                            <FiLogOut />
                        </Button>
                    </Flex>
                ) : (

                    <Link to={"/auth/signup"}>
                        <Button
                            borderRadius={"full"}
                            w={10}
                            h={10}
                            bg={"blue.400"}
                            size={"sm"}
                        >
                            <GrUserNew />
                        </Button>
                    </Link>
                )
                }
            </Flex>
        </>
    )
}