import { Button, Flex } from "@chakra-ui/react";
import { KeyboardEvent, useState } from "react";
import useApi from "../../hooks/useApi";
import TextareaAutosize from "../TextareaAutosize";
import Zbra from "../../@ts/Zbra";
import Friend from "../../@ts/Friend";

export default function ConversationSendMessage({ friend, addZbra }: { friend: Friend|null, addZbra: (zbra: Zbra) => void }) {
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [inputMessage, setInputMessage] = useState('');
    const { createZbraApi } = useApi();

    const handleSendMessage = async () => {
        if (!inputMessage.trim().length || null === friend) {
            return;
        }
    
        try {
            setIsLoading(true);
            const response = await createZbraApi(friend.id, inputMessage);

            addZbra(response.data);
            setInputMessage('');
            setIsLoading(false);
        } catch(error) {

        }
    };

    return (
        <Flex 
            w="100%"
            alignItems="flex-end"
            position="relative"
            overflowX="hidden"
            pl="4"
        >
            <TextareaAutosize
                placeholder="Zbraaaaaa..."
                borderRadius="md"
                marginRight="50px"
                py="3"
                paddingRight="5"
                border="1px solid #EEEEEE"
                value={inputMessage}
                _focusVisible={{ boxShadow: "none" }}
                borderLeftRadius="3xl"
                borderRightRadius="md"
                onKeyPress={(e: KeyboardEvent) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        handleSendMessage();
                    }
                }}
                onChange={(e) => setInputMessage(e.target.value)}
            />
            <Button
                position="absolute"
                py="6"
                right="0"
                bg="brand.900"
                color="white"
                borderLeftRadius="3xl"
                borderRightRadius="sm"
                _hover={{
                    bg: "brand.500",
                }}
                onClick={handleSendMessage}
                isLoading={isLoading}
            >
                Send
            </Button>
        </Flex>
    )
}