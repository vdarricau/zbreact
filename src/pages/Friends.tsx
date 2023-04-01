import {
    Box, Button, Container, Heading, SimpleGrid, useDisclosure, useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaCross, FaTrash } from "react-icons/fa";
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
                <Box py="5">
                    <Link to={'/zbros/add'}>
                        <Button 
                            w="100%" 
                            h="70px"
                            fontSize="2xl"
                            colorScheme="orange"
                            transition="all 0.5s ease-out"
                        >
                            FIND ZBROS
                        </Button>
                    </Link>
                </Box>
                <Box py={5}>
                    { friends.length !== 0 ? <>
                        <Heading as='h1' size='lg' marginBottom="3">
                            Zbros ({friends.length})
                        </Heading>
                        <Box>
                            { friends.map((friend) => {
                                return (
                                    <FriendItem friend={friend} key={friend.id}>
                                        <Button p="0" borderRadius="50" fontWeight="bold" onClick={(e) => {
                                            e.stopPropagation();
                                            alert('cannot do that yet bro');
                                        }}>
                                            <FaTrash />
                                        </Button>
                                    </FriendItem>
                                )
                            })}
                        </Box>
                    </> : <>
                        <Heading as='h3' size='2xl' marginBottom="3">
                            No zbros yet!
                        </Heading>
                    </> }
                </Box>

                <SendZbraModal friend={friend} isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
            </Container>
        </>
    );
}

export default Friends;