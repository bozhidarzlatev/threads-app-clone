import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useFollowUnfollow from "../../hooks/useFollowUnfollow";

export default function SuggesterUser({user}) {
    const { handleFollowUnfollow,  updating, follow} = useFollowUnfollow(user);

    return (
        <Flex gap={2} justifyContent={"space-between"} alignItems={"center"}>
            <Flex gap={2} as={Link} to={`${user.username}`}>
                <Avatar.Root size={"sm"} >
                    <Avatar.Fallback name={user.username} />
                    <Avatar.Image src={user.profilePic} />
                </Avatar.Root>
                <Box>
                    <Text fontSize={"sm"} fontWeight={"bold"}>
                        {user.username}
                    </Text>
                    <Text color={"gray.light"} fontSize={"sm"}>
                        {user.name}
                    </Text>
                </Box>
            </Flex>
            <Button
                size={"sm"}
                color={follow ? "black" : "white"}
                bg={follow ? "white" : "blue.400"}
                onClick={handleFollowUnfollow}
                loading={updating}
                _hover={{
                    color: follow ? "black" : "white",
                    opacity: ".8",
                }}
            >
                {follow ? "Unfollow" : "Follow"}
            </Button>
        </Flex>
    )
}