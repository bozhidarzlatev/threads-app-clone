import { IoIosSend } from "react-icons/io";
import {
    Input,
    InputGroup,

    InputRightElement,
} from "@chakra-ui/input"
export default function MessageInput() {
    return (
    <form style={{ width: "100%" }}>
      <InputGroup w="100%">
        <Input
          w="100%"
          placeholder="Type a message"
          pr="3rem" // make space for the icon/button
        />
        <InputRightElement>
          <IoIosSend size={20} />
        </InputRightElement>
      </InputGroup>
    </form>
    )
}