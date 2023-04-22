import {
    Box, Button, Center, Container, Flex, Heading, Text, useDisclosure, useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import Friend from "../@ts/Friend";
import FriendItem from "../components/FriendItem";
import SendZbraModal from "../components/SendZbraModal";
import useApi from "../hooks/useApi";

const Friends = () => {
    const [friends, setFriends] = useState<Array<Friend>>([]);
    const { getFriendsApi, getFriendRequestsApi, acceptFriendRequestApi, createZbraApi } = useApi();
    const toast = useToast();

    // Send Zbra modal
    const [friend, setFriend] = useState<Friend|null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const getFriends = async () => {
        try {
            const response = await getFriendsApi()

            setFriends(response.data);
        } catch (error) {
            // @TODO deal with this later
        }
    }

    const openSendZbraModal = (friend: Friend) => {
        setFriend(friend);
        onOpen();
    }

    useEffect(() => {
        getFriends();
    }, []);

    return (
        <>
            <Container>
                <Center py="5">
                    <Link to={'/zbros/add'}>
                        <Button 
                            fontSize="md"
                            variant="gradient"
                            px="10"
                        >
                            FIND NEW ZBROS
                        </Button>
                    </Link>
                </Center>
                <Box py={5}>
                    <Heading as='h1' size='sm' marginBottom="3" display="flex">
                        Zbros <Text fontWeight="normal">({friends.length})</Text>
                    </Heading>
                    { friends.length !== 0 ?
                        <Box>
                            { friends.map((friend) => {
                                return (
                                    <FriendItem friend={friend} key={friend.id}>
                                        <Flex py="3">
                                            <a onClick={(e) => {
                                                e.preventDefault();
                                                alert("cannot do that yet");
                                            }}>
                                                <FaTimes color="#FC4545"  size="18" />
                                            </a>
                                        </Flex>
                                    </FriendItem>
                                )
                            })}
                        </Box>
                    :
                        <Heading as='h3' size='2xl' marginBottom="3">
                            No zbros yet!
                        </Heading>
                    }
                </Box>

                <SendZbraModal friend={friend} isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
            </Container>
        </>
    );
}

export default Friends;