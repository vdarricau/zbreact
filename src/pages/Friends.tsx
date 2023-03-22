import {
    Badge, Box, Button, Container, Heading, Image, Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Stack, useDisclosure
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuthHeader } from 'react-auth-kit';
import Friend from "../@ts/Friend";
import api from "../api/api";
import FriendItem from "../components/FriendItem";

const Friends = () => {
    const [ friends, setFriends ] = useState<Array<Friend>>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ friend, setFriend ] = useState<Friend|null>(null);
    const authHeader = useAuthHeader();

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
                <Box py={5}>
                    <Heading as='h1' size='2xl' noOfLines={1}>
                        Zbros
                    </Heading>
                </Box>

                { friends.length !== 0 ?  
                    <SimpleGrid minChildWidth='320px'>
                        { friends.map((friend) => {
                            return (
                                <FriendItem friend={friend} key={friend.id}>
                                    <Button borderRadius="50" fontWeight="bold" onClick={() => openSendZbraModal(friend)}>Zbra</Button>
                                </FriendItem>
                            )
                        })}
                    </SimpleGrid>
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