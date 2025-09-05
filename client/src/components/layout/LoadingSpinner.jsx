import { Flex, Spinner } from "@chakra-ui/react";

export default function LoadingSpinner() {
    return (
        <Flex justifyContent={"center"} my={20}>
            <Spinner size={"xl"} />
        </Flex>
    )
}