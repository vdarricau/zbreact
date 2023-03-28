import {
    Box, Button, Container, FormControl,
    FormLabel, Heading, Input, Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, useDisclosure, useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Friend from "../@ts/Friend";
import FriendRequest from "../@ts/FriendRequest";
import FriendItem from "../components/FriendItem";
import useApi from "../hooks/useApi";

const Friends = () => {
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ friends, setFriends ] = useState<Array<Friend>>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ friend, setFriend ] = useState<Friend|null>(null);
    const [ friendRequests, setFriendRequests ] = useState<Array<FriendRequest>>([]);
    const { getFriendsApi, getFriendRequestsApi, acceptFriendRequestApi, createZbraApi } = useApi();
    const toast = useToast();
    const navigate = useNavigate();

    const getFriends = async () => {
        try {
            const response = await getFriendsApi()

            setFriends(response.data);
        } catch (error) {
            // @TODO deal with this later
        }
    }

    const getFriendRequests = async () => {
        try {
            const response = await getFriendRequestsApi();

            setFriendRequests(response.data);
        } catch (error) {
            // @TODO deal with this later
        }
    }

    const acceptFriendRequest = async (friendRequest: FriendRequest) => {
        try {
            const response = await acceptFriendRequestApi(friendRequest);

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
        e.stopPropagation();

        setIsLoading(true);

        const target = e.target as typeof e.target & {
          friendId: { value: string };
          message: { value: string };
        };
        
        try {
            const response = await createZbraApi(target.friendId.value, target.message.value);

            setIsLoading(false);
            onClose();
            toast({
                title: `!ZBRA!`,
                status: 'success'
            });
            navigate(`/zbros/${target.friendId.value}`);
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
                { friendRequests.length !== 0 ?  
                    <Box py={5}>
                        <Heading as='h1' size='2xl' marginBottom="3">
                            Future Zbros
                        </Heading>
                        <Box>
                            { friendRequests.map((friendRequest) => {
                                return (
                                    <FriendItem friend={friendRequest.requester} key={friendRequest.id}>
                                        <Button borderRadius="50" fontWeight="bold" onClick={(e) => {
                                            e.stopPropagation();
                                            acceptFriendRequest(friendRequest);
                                        }}>Accept</Button>
                                    </FriendItem>
                                )
                            })}
                        </Box>
                    </Box>
                : null }
                <Box py={5}>
                    { friends.length !== 0 ? <>
                        <Heading as='h1' size='2xl' marginBottom="3">
                            ZBROS
                        </Heading>
                        <SimpleGrid minChildWidth='320px'>
                            { friends.map((friend) => {
                                return (
                                    <FriendItem friend={friend} key={friend.id}>
                                        <Button borderRadius="50" fontWeight="bold" onClick={(e) => {
                                            e.stopPropagation();
                                            openSendZbraModal(friend);
                                        }}>Zbra</Button>
                                    </FriendItem>
                                )
                            })}
                        </SimpleGrid>
                    </> : <>
                        <Heading as='h3' size='2xl' marginBottom="3">
                            No zbros yet!
                        </Heading>
                    </> }
                </Box>

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