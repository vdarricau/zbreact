import {
    Box, Button, Container, FormControl,
    FormLabel, Heading, Input, Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, useDisclosure, useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuthHeader } from 'react-auth-kit';
import Friend from "../@ts/Friend";
import FriendRequest from "../@ts/FriendRequest";
import api from "../api/api";
import FriendItem from "../components/FriendItem";

const Friends = () => {
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
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

    const handleSubmitSendZbra = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        setIsLoading(true);
        // setError(null);

        const target = e.target as typeof e.target & {
          friendId: { value: string };
          message: { value: string };
        };
        
        try {
            const response = await api.post('/zbras', {
                friendId: target.friendId.value,
                message: target.message.value
            }, {
                headers: {
                    Authorization: authHeader(),
                }
            });

            setIsLoading(false);
            onClose();
            toast({
                title: `!ZBRA!`,
                status: 'success'
            })
        } catch (error) {

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
                        <Heading as='h1' size='2xl' marginBottom="3">
                            Future Zbros
                        </Heading>
                        <Box>
                            { friendRequests.map((friendRequest) => {
                                return (
                                    <FriendItem friend={friendRequest.requester} key={friendRequest.id}>
                                        <Button borderRadius="50" fontWeight="bold" onClick={() => acceptFriendRequest(friendRequest)}>Accept</Button>
                                    </FriendItem>
                                )
                            })}
                        </Box>
                    </Box>
                : null }
                    { friends.length !== 0 ?  
                    <Box py={5}>
                        <Heading as='h1' size='2xl' marginBottom="3">
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

                        <form method="post" onSubmit={handleSubmitSendZbra}>
                            <ModalBody>
                                <Input id="friendId" type="hidden" value={friend?.id} />
                                <FormControl isRequired>
                                    <FormLabel>Zbra</FormLabel>
                                    <Input id="message" placeholder='a-ZBRA-cada-ZBRA' defaultValue="a-ZBRA-cada-ZBRA" /> {/* TODO randomize this */}
                                </FormControl>
                            </ModalBody>

                            <ModalFooter>
                                <Button 
                                    variant="solid"
                                    type="submit"
                                    colorScheme="orange"
                                    isLoading={isLoading}
                                    mr="2"
                                >ZBRA!</Button>
                                <Button colorScheme='blue' mr={3} onClick={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </form>
                    </ModalContent>
                </Modal>
            </Container>
        </>
    );
}

export default Friends;