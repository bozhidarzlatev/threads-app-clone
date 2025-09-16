import { Box, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import SuggesterUser from "./SuggesterUser";
import useShowToast from "../../hooks/useShowToast";

export default function SuggestedUsers() {
    const [loading, setLoading] = useState(true);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const showToast = useShowToast()


    useEffect(() => {

        const getSuggestedUser = async () => {
            setLoading(true)
            try {

                const res = await fetch("/api/users/suggested");
                const data = await res.json();

                if (data.error) {
                    showToast(false, data.error)
                }


                setSuggestedUsers(data)
            } catch (error) {
                showToast(false, error.message)
            } finally {
                setLoading(false)
            }
        }


        getSuggestedUser()
    }, [])

    return (
        <>
            <Text mb={4} fontWeight={"bold"}>
                SUGGESTED USERS
            </Text>
            <Flex direction={"column"} gap={4}>
                {!loading && suggestedUsers.map((user) => (
                    <SuggesterUser key={user._id} user={user} />
                ))

                }

                {loading && [...Array(5)].map((_, id) => (
                    <Flex key={id} gap={2} alignItems={"center"} p={"1"} borderRadius={"nd"}>
                        <Box>
                            <SkeletonCircle size={"10"} />
                        </Box>
                        <Flex w={"full"} flexDirection={"column"} gap={2}>
                            <Skeleton h={"8px"} w={"80px"} />
                            <Skeleton h={"8px"} w={"80px"} />
                        </Flex>
                        <Flex >
                            <Skeleton h={"20px"} w={"60px"} />
                        </Flex>
                    </Flex>
                ))}

            </Flex>
        </>
    )
}