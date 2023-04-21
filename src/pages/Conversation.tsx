import { Container, Flex, Grid } from "@chakra-ui/react";
import { memo, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Friend from "../@ts/Friend";
import Zbra from "../@ts/Zbra";
import ConversationHeader from "../components/Conversation/ConversationHeader";
import ConversationBody from "../components/Conversation/ConversationsBody";
import ConversationSendMessage from "../components/Conversation/ConversationSendMessage";
import useApi from "../hooks/useApi";
import useSocket from "../hooks/useSocket";

const MemoHeader = memo(ConversationHeader);

type FriendPageParams = { friendId: string };

export default function Conversation() {
    const { friendId } = useParams<FriendPageParams>() as FriendPageParams;
    
    const [friend, setFriend] = useState<Friend|null>(null);
    const [zbras, setZbras] = useState<Array<Zbra>|null>(null);

    const { getFriendApi, getExchangedZbrasApi } = useApi();
    const { listenZbraConversation } = useSocket();

    useEffect(() => {
        getFriend();
        getExchangedZbras();
    }, []);

    listenZbraConversation(friendId, (payload) => {
        setZbras([...(zbras ?? []), payload.data]);
    });

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

    const addZbra = (zbra: Zbra) => setZbras([...(zbras ?? []), zbra]);

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
                    <MemoHeader friend={friend} />

                    <Flex
                        w="100%"
                        overflowY="auto"
                        flexDirection="column"
                        p="3"
                    >
                        <ConversationBody zbras={zbras} friend={friend} />
                        <AlwaysScrollToBottom />
                    </Flex>

                    <ConversationSendMessage friend={friend} addZbra={addZbra} />
                </Grid>
            </Container>
        </>
    )
}

const AlwaysScrollToBottom = () => {
    const elementRef = useRef<HTMLDivElement>(null);
    useEffect(() => elementRef.current?.scrollIntoView());
    
    return <div ref={elementRef} />;
};
