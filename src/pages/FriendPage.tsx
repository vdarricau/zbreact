import { Avatar, Button, Container, Flex, Grid, Text } from "@chakra-ui/react";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate, useParams } from "react-router-dom";
import Friend from "../@ts/Friend";
import Zbra from "../@ts/Zbra";
import TextareaAutosize from "../components/TextareaAutosize";
import useApi from "../hooks/useApi";

const AlwaysScrollToBottom = () => {
    const elementRef = useRef<HTMLDivElement>(null);
    useEffect(() => elementRef.current?.scrollIntoView());
    
    return <div ref={elementRef} />;
  };

type FriendPageParams = { friendId: string };

export default function FriendPage() {
    let { friendId } = useParams<FriendPageParams>() as FriendPageParams;
    let [friend, setFriend] = useState<Friend|null>(null);
    let [zbras, setZbras] = useState<Array<Zbra>>([]);
    let { createZbraApi, getFriendApi, getExchangedZbrasApi } = useApi()
    let navigate = useNavigate();

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

    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = async () => {
        if (!inputMessage.trim().length) {
            return;
        }
    
        try {
            const response = await createZbraApi(friendId, inputMessage);

            setZbras([...zbras, response.data]);
            setInputMessage('');
        } catch(error) {

        }
    };

    return (
        <>
            <Container
                py="5"
                px="0"
                h="100%"
            >
                <Grid gridTemplateRows="auto 1fr auto" maxH="100%">
                    <Flex 
                        w="100%" 
                        alignItems="center"
                        justifyContent="center"
                        position="relative"
                    >
                        <Button 
                            onClick={() => (navigate(-1))}
                            bg="none"
                            _hover={{bg: "none"}}
                            position="absolute"
                            left="5"
                        >
                            <FaChevronLeft size="29" />
                        </Button>
                        <Avatar name={friend?.username} src={friend?.avatar} size="sm" />
                        <Text fontSize="lg" fontWeight="semibold" pl="2">
                            { friend?.username }
                        </Text>
                    </Flex>

                    <Flex
                        w="100%"
                        overflowY="auto"
                        flexDirection="column"
                        p="3"
                    >
                        {zbras.map((zbra) => {
                            if (zbra.receiver.id === friend?.id) {
                                return (
                                    <Flex key={zbra.id} w="100%" justify="flex-end">
                                        <Flex
                                            bg="brand.900"
                                            color="white"
                                            borderRadius="md"
                                            minW="100px"
                                            maxW="350px"
                                            my="1"
                                            p="3"
                                        >
                                            <Text whiteSpace="pre-line">{zbra.message}</Text>
                                        </Flex>
                                    </Flex>
                                );
                            } else {
                                return (
                                    <Flex key={zbra.id} w="100%">
                                        <Avatar name={zbra.sender.username} src={zbra.sender.avatar} />
                                        <Flex
                                            bg="white"
                                            color="black"
                                            border="1px solid #EEEEEE"
                                            borderRadius="md"
                                            minW="100px"
                                            maxW="350px"
                                            my="1"
                                            mx="2"
                                            p="3"
                                        >
                                            <Text whiteSpace="pre-line">{zbra.message}</Text>
                                        </Flex>
                                    </Flex>
                                );
                            }
                        })}
                        <AlwaysScrollToBottom />
                    </Flex>

                    <Flex w="100%" alignItems="flex-end" position="relative">
                        <TextareaAutosize
                            placeholder="Type Something..."
                            borderRadius="md"
                            marginRight="50px"
                            paddingRight="5"
                            border="1px solid #EEEEEE"
                            value={inputMessage}
                            _focusVisible={{border: "none", boxShadow: "none"}}
                            onKeyPress={(e: KeyboardEvent) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    handleSendMessage();
                                }
                            }}
                            onChange={(e) => setInputMessage(e.target.value)}
                        />
                        <Button
                            position="absolute"
                            right="0"
                            bg="brand.900"
                            color="white"
                            borderLeftRadius="full"
                            borderRightRadius="full"
                            _hover={{
                                bg: "brand.500",
                            }}
                            onClick={handleSendMessage}
                        >
                            Send
                        </Button>
                    </Flex>
                </Grid>
            </Container>
        </>
    )
}