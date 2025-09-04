import {  Flex, Image } from "@chakra-ui/react";
import { useColorMode } from "../ui/color-mode";
import { useUserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";


export default function Header(){
    const {colorMode,  toggleColorMode} = useColorMode();
    const {userData} = useUserContext()
    return (
        <>
        <Flex justifyContent={"space-between"} mt={6} mb="12">
            {userData._id && (
                <Link to={"/"}>
                    <IoMdHome size={24}/>
                </Link>
            )}
            <Image 
                cursor={"pointer"}
                alt='logo'
                w={6}
                src={colorMode ==="dark" ? "/light-logo.svg": "dark-logo.svg"}
                onClick={toggleColorMode}
                />
        {userData._id && (
            <Link to={`/${userData.username}`}>
                <RxAvatar size={24}/>
            </Link>
        )}
        </Flex>
                </>
    )
}