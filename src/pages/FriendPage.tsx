import { Avatar, Button, Container, Divider, Flex, Input, Text } from "@chakra-ui/react";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate, useParams } from "react-router-dom";
import Friend from "../@ts/Friend";
import Zbra from "../@ts/Zbra";
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

            // setIsLoading(false);

            setFriend(response.data);
        } catch (error) {

        }
    }

    const getExchangedZbras = async () => {
        try {
            const response = await getExchangedZbrasApi(friendId);

            // setIsLoading(false);

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
            <Container py="5" h="calc(100% - 2 * var(--chakra-space-5))">
                <Flex pb="5" align="center" fontWeight='bold'>
                    <Button onClick={() => (navigate(-1))}>
                        <FaChevronLeft /> &nbsp; Back
                    </Button>
                </Flex>
                <Flex w="100%">
                    <Avatar name={friend?.username} src={friend?.avatar} />
                    <Flex flexDirection="column" mx="5" justify="center">
                        <Text fontSize="lg" fontWeight="bold">
                            { friend?.username }
                        </Text>
                        <Text color="green.500">Online</Text> {/* TODO */}
                    </Flex>
                </Flex>

                <Divider w="100%" borderBottomWidth="3px" color="black" mt="5" />
                
                <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3">
                    {zbras.map((zbra) => {
                        if (zbra.receiver.id === friend?.id) {
                            return (
                                <Flex key={zbra.id} w="100%" justify="flex-end">
                                    <Flex
                                        bg="orange"
                                        color="white"
                                        minW="100px"
                                        maxW="350px"
                                        my="1"
                                        p="3"
                                    >
                                        <Text>{zbra.message}</Text>
                                    </Flex>
                                </Flex>
                            );
                        } else {
                            return (
                                <Flex key={zbra.id} w="100%">
                                    <Avatar name={zbra.sender.username} src={zbra.sender.avatar} />
                                    <Flex
                                        bg="gray.100"
                                        color="orange"
                                        minW="100px"
                                        maxW="350px"
                                        my="1"
                                        mx="2"
                                        p="3"
                                    >
                                        <Text>{zbra.message}</Text>
                                    </Flex>
                                </Flex>
                            );
                        }
                    })}
                    <AlwaysScrollToBottom />
                </Flex>

                <Divider w="100%" borderBottomWidth="3px" color="black" />

                <Flex w="100%" mt="5">
                    <Input
                        placeholder="Type Something..."
                        border="none"
                        borderRadius="none"
                        _focus={{
                            border: "1px solid black",
                        }}
                        onKeyPress={(e: KeyboardEvent) => {
                            if (e.key === "Enter") {
                                handleSendMessage();
                            }
                        }}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                    />
                    <Button
                        bg="black"
                        color="white"
                        borderRadius="none"
                        _hover={{
                        bg: "white",
                        color: "black",
                        border: "1px solid black",
                        }}
                        onClick={handleSendMessage}
                    >
                        Send
                    </Button>
                </Flex>
            </Container>
        </>
    )
}