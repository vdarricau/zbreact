import { Container, Flex, Grid } from "@chakra-ui/react";
import { memo, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Friend from "../@ts/Friend";
import Message from "../@ts/Message";
import ConversationHeader from "../components/Conversation/ConversationHeader";
import ConversationBody from "../components/Conversation/ConversationBody";
import ConversationSendMessage from "../components/Conversation/ConversationSendMessage";
import useApi from "../hooks/useApi";
import useSocket from "../hooks/useSocket";
import Conversation from "../@ts/Conversation";

const MemoHeader = memo(ConversationHeader);

type ConversationPageParams = { conversationId: string };

export default function ConversationPage() {
    const { conversationId } =
        useParams<ConversationPageParams>() as ConversationPageParams;

    const [conversation, setConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Array<Message> | null>(null);

    const { getConversationApi, getMessagesApi } = useApi();
    const { listenMessagesConversation } = useSocket();

    useEffect(() => {
        getConversation();
        getMessages();
    }, []);

    listenMessagesConversation(conversationId, (payload) => {
        addMessage(payload.data);
    });

    const getConversation = async () => {
        try {
            const response = await getConversationApi(conversationId);
            const conversation = response.data as Conversation;

            setConversation(conversation);
        } catch (error) {}
    };

    const getMessages = async () => {
        try {
            const response = await getMessagesApi(conversationId);

            setMessages(response.data);
        } catch (error) {}
    };

    const addMessage = (message: Message) => {
        if (messages === null) {
            return;
        }

        setMessages([...messages, message]);
    };

    return (
        <>
            <Container py="0" px="0" pb="5" h="100%">
                <Grid gridTemplateRows="auto 1fr auto" h="100%">
                    <MemoHeader friend={conversation?.friend ?? null} />

                    <Flex
                        w="100%"
                        overflowY="auto"
                        flexDirection="column"
                        p="3"
                    >
                        <ConversationBody
                            messages={messages}
                            friend={conversation?.friend ?? null}
                        />
                        <AlwaysScrollToBottom />
                    </Flex>

                    <ConversationSendMessage
                        conversation={conversation}
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
