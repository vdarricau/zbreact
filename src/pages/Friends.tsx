import { Box, Badge, Container, Grid, GridItem, Heading, Image, SimpleGrid, Stack, Button, useDisclosure } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../hooks/useAuth";
import avatar from "../assets/avatar.png"

export interface Friend {
    id: string;
    username: string;
    name: string;
    avatar?: string;
}

const Friends = () => {
    const { user } = useAuth();
    const [ friends, setFriends ] = useState<Array<Friend>>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ friend, setFriend ] = useState<Friend|null>(null);

    const getFriends = async () => {
        try {
            const response = await api.get('/friends', {
                headers: {
                    Authorization: 'Bearer ' + user?.authToken,
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
                <Stack spacing={6}>
                    <Heading as='h1' size='4xl' noOfLines={1}>
                        Zbros
                    </Heading>
                </Stack>

                { friends.length !== 0 ?  
                    <SimpleGrid>
                        { friends.map((friend) => {
                            return (
                                <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' key={friend.id}>
                                    <Image src={friend.avatar ? friend.avatar : avatar} alt="friend avatar" />

                                    <Box p='6'>
                                        <Box display='flex' alignItems='baseline'>
                                            <Badge borderRadius='full' px='2' colorScheme='teal'>
                                                New
                                            </Badge>
                                        </Box>

                                        <Box
                                            mt='1'
                                            fontWeight='semibold'
                                            as='h4'
                                            lineHeight='tight'
                                            noOfLines={1}
                                        >
                                        {friend.username}
                                        </Box>

                                        <Box display='flex' mt='2' alignItems='center'>
                                            <Button onClick={() => openSendZbraModal(friend)}>Send Zbra</Button>
                                        </Box>
                                    </Box>
                                </Box>
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