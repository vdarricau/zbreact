import {
    Box, Button, Container, Heading, Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, useDisclosure, useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuthHeader } from 'react-auth-kit';
import Friend from "../@ts/Friend";
import FriendRequest from "../@ts/FriendRequest";
import api from "../api/api";
import FriendItem from "../components/FriendItem";

const Friends = () => {
    const [ friends, setFriends ] = useState<Array<Friend>>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ friend, setFriend ] = useState<Friend|null>(null);
    const [ friendRequests, setFriendRequests ] = useState<Array<FriendRequest>>([]);
    const authHeader = useAuthHeader();
    const toast = useToast();

    const getFriends = async () => {
        try {
            const response = await api.get('/friends', {
                headers: {
                    Authorization: authHeader(),
                }
            });

            setFriends(response.data);
        } catch (error) {
            // @TODO deal with this later
        }
    }

    const getFriendRequests = async () => {
        try {
            const response = await api.get('/friend-requests', {
                headers: {
                    Authorization: authHeader(),
                }
            });

            setFriendRequests(response.data);
        } catch (error) {
            // @TODO deal with this later
        }
    }

    const acceptFriendRequest = async (friendRequest: FriendRequest) => {
        try {
            const response = await api.post(`/friend-requests/${friendRequest.id}/accept`, {}, {
                headers: {
                    Authorization: authHeader(),
                }
            });

            toast({
                title: `${friendRequest.requester.username} is now a zbro. Go send him a zbra!`,
                status: 'success'
            })

            await getFriendRequests();
            await getFriends();
        } catch (error) {
            // @TODO deal with this later
        }
    }

    const openSendZbraModal = (friend: Friend) => {
        setFriend(friend);
        onOpen();
    }
    
    useEffect(() => {
        getFriendRequests();
        getFriends();
    }, []);

    return (
        <>
            <Container>
                { friendRequests.length !== 0 ?  
                    <Box py={5}>
                        <Heading as='h1' size='2xl' noOfLines={1}>
                            Future Zbros
                        </Heading>
                        <SimpleGrid minChildWidth='320px'>
                            { friendRequests.map((friendRequest) => {
                                return (
                                    <FriendItem friend={friendRequest.requester} key={friendRequest.id}>
                                        <Button borderRadius="50" fontWeight="bold" onClick={() => acceptFriendRequest(friendRequest)}>Accept</Button>
                                    </FriendItem>
                                )
                            })}
                        </SimpleGrid>
                    </Box>
                : null }
                    { friends.length !== 0 ?  
                    <Box py={5}>
                        <Heading as='h1' size='2xl' noOfLines={1}>
                            OGs
                        </Heading>
                        <SimpleGrid minChildWidth='320px'>
                            { friends.map((friend) => {
                                return (
                                    <FriendItem friend={friend} key={friend.id}>
                                        <Button borderRadius="50" fontWeight="bold" onClick={() => openSendZbraModal(friend)}>Zbra</Button>
                                    </FriendItem>
                                )
                            })}
                        </SimpleGrid>
                    </Box>
                : null }

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Send Zbra to "{friend?.username}"</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            Can't send a Zbra yet sorry zbro
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Container>
        </>
    );
}

export default Friends;