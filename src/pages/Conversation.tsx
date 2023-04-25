import { Container, Flex, Grid } from "@chakra-ui/react";
import { memo, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Friend from "../@ts/Friend";
import Message from "../@ts/Message";
import ConversationHeader from "../components/Conversation/ConversationHeader";
import ConversationBody from "../components/Conversation/ConversationsBody";
import ConversationSendMessage from "../components/Conversation/ConversationSendMessage";
import useApi from "../hooks/useApi";
import useSocket from "../hooks/useSocket";

const MemoHeader = memo(ConversationHeader);

type FriendPageParams = { friendId: string };

export default function Conversation() {
    const { friendId } = useParams<FriendPageParams>() as FriendPageParams;

    const [friend, setFriend] = useState<Friend | null>(null);
    const [messages, setMessages] = useState<Array<Message> | null>(null);

    const { getFriendApi, getExchangedMessagesApi } = useApi();
    const { listenMessageConversation } = useSocket();

    useEffect(() => {
        getFriend();
        getExchangedMessages();
    }, []);

    listenMessageConversation(friendId, (payload) => {
        setMessages([...(messages ?? []), payload.data]);
    });

    const getFriend = async () => {
        try {
            const response = await getFriendApi(friendId);
            setFriend(response.data);
        } catch (error) {}
    };

    const getExchangedMessages = async () => {
        try {
            const response = await getExchangedMessagesApi(friendId);
            setMessages(response.data);
        } catch (error) {}
    };

    const addMessage = (message: Message) =>
        setMessages([...(messages ?? []), message]);

    return (
        <>
            <Container py="0" px="0" pb="5" h="100%">
                <Grid gridTemplateRows="auto 1fr auto" h="100%">
                    <MemoHeader friend={friend} />

                    <Flex
                        w="100%"
                        overflowY="auto"
                        flexDirection="column"
                        p="3"
                    >
                        <ConversationBody messages={messages} friend={friend} />
                        <AlwaysScrollToBottom />
                    </Flex>

                    <ConversationSendMessage
                        friend={friend}
                        addMessage={addMessage}
                    />
                </Grid>
            </Container>
        </>
    );
}

const AlwaysScrollToBottom = () => {
    const elementRef = useRef<HTMLDivElement>(null);
    useEffect(() => elementRef.current?.scrollIntoView());

    return <div ref={elementRef} />;
};
