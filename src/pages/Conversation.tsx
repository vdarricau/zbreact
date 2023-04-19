import { Button, Container, Flex, Grid } from "@chakra-ui/react";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Friend from "../@ts/Friend";
import Zbra from "../@ts/Zbra";
import ConversationHeader from "../components/Conversation/ConversationHeader";
import ConversationBody from "../components/Conversation/ConversationsBody";
import TextareaAutosize from "../components/TextareaAutosize";
import useApi from "../hooks/useApi";
import useSocket from "../hooks/useSocket";

const AlwaysScrollToBottom = () => {
    const elementRef = useRef<HTMLDivElement>(null);
    useEffect(() => elementRef.current?.scrollIntoView());
    
    return <div ref={elementRef} />;
  };

type FriendPageParams = { friendId: string };

export default function Conversation() {
    const { friendId } = useParams<FriendPageParams>() as FriendPageParams;
    
    const [friend, setFriend] = useState<Friend|null>(null);
    const [zbras, setZbras] = useState<Array<Zbra>|null>(null);
    const [inputMessage, setInputMessage] = useState('');
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const { createZbraApi, getFriendApi, getExchangedZbrasApi } = useApi();
    const { listenZbraConversation } = useSocket();

    listenZbraConversation(friendId, (payload) => {
        if (null === zbras) {
            return;
        }

        const zbra = payload.data as Zbra;

        setZbras([...zbras, zbra]);
    })


    useEffect(() => {
        getFriend();
        getExchangedZbras();
    }, []);

    const getFriend = async () => {
        try {
            const response = await getFriendApi(friendId);
            setFriend(response.data);
        } catch (error) {

        }
    }

    const getExchangedZbras = async () => {
        try {
            const response = await getExchangedZbrasApi(friendId);
            setZbras(response.data);
        } catch (error) {

        }
    }

    const handleSendMessage = async () => {
        if (!inputMessage.trim().length) {
            return;
        }

        if (null === zbras) {
            return;
        }
    
        try {
            setIsLoading(true);
            const response = await createZbraApi(friendId, inputMessage);

            setZbras([...zbras, response.data]);
            setInputMessage('');
            setIsLoading(false);
        } catch(error) {

        }
    };

    return (
        <>
            <Container
                py="0"
                px="0"
                pb="5"
                h="100%"
            >
                <Grid 
                    gridTemplateRows="auto 1fr auto"
                    h="100%"
                >
                    <ConversationHeader friend={friend} />

                    <Flex
                        w="100%"
                        overflowY="auto"
                        flexDirection="column"
                        p="3"
                    >
                        <ConversationBody zbras={zbras} friend={friend} />
                        <AlwaysScrollToBottom />
                    </Flex>

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
                </Grid>
            </Container>
        </>
    )
}