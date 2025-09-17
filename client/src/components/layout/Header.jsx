import { useColorMode } from "../ui/color-mode";
import { useUserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { Avatar, Button, Flex, Image } from "@chakra-ui/react";
import useShowToast from "../../hooks/useShowToast";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { GrUserNew } from "react-icons/gr";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { MdOutlineSettings } from "react-icons/md";
import useLogout from "../../hooks/useLogout";

export default function Header() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { userData } = useUserContext()
    const { logout } = useLogout()



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
                    src={colorMode === "dark" ? "/logo_light.png" : "/logo_dark.png"}
                    onClick={toggleColorMode}
                    position="absolute"
                    left="50%"
                    transform="translateX(-50%)"

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
                        <Link to={`/chat`}>
                            <Button
                                borderRadius={"full"}
                                w={10}
                                h={10}
                                size={"sm"}
                            >
                                <BsFillChatQuoteFill size={24} />
                            </Button>
                        </Link>
                        <Link to={`/settings`}>
                            <Button
                                borderRadius={"full"}
                                w={10}
                                h={10}
                                size={"sm"}
                            >
                                <MdOutlineSettings size={24} />
                            </Button>
                        </Link>
                        <Button
                            borderRadius={"full"}
                            w={10}
                            h={10}
                            size={"sm"}
                            onClick={logout}>
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