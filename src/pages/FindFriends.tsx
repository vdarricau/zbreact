import { Box, Button, Container, Heading, Input, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import Friend from "../@ts/Friend";
import FriendRequest from "../@ts/FriendRequest";
import FriendItem from "../components/FriendItem";
import PendingFriendRequestsComponent from "../components/PendingFriendRequestsComponent";
import SendZbraModal from "../components/SendZbraModal";
import useApi from "../hooks/useApi";

interface UserFind {
    id: string,
    friendRequest: FriendRequest|null,
    user: Friend,
    isFriend: boolean
}

const ButtonFindFriend = (
    { userFind, openSendZbraModal, refresh, setRefresh }: 
    { userFind: UserFind, openSendZbraModal: (friend: Friend) => void, refresh: number, setRefresh: (refresh: number) => void }
) => {
    const { sendFriendRequestApi, acceptFriendRequestApi } = useApi();
    const toast = useToast();
    const user = useAuthUser()();

    const [friendRequest, setFriendRequest] = useState<FriendRequest|null>(userFind.friendRequest);
    const [isFriend, setIsFriend] = useState<boolean>(userFind.isFriend);

    const sendFriendRequest = async (futureFriend: UserFind) => {
        if (friendRequest) {         
            return;
        }

        try {
            const response = await sendFriendRequestApi(futureFriend.user);

            setFriendRequest(response.data);

            toast({
                title: `You just sent a ZBRO request to ${futureFriend.user.username}, the lucky ZBRAstard!`,
                status: 'success'
            })
        } catch (e: unknown) {

        }
    }

    const acceptFriendRequest = async (friendRequest: FriendRequest) => {
        try {
            await acceptFriendRequestApi(friendRequest);

            toast({
                title: `${friendRequest.requester.username} is now a zbro. Go send him a zbra!`,
                status: 'success'
            })

            setFriendRequest(null);
            setRefresh(++refresh);
            setIsFriend(true);
        } catch (error) {
            // @TODO deal with this later
        }
    }

    if (friendRequest) {
        const hasSent = friendRequest.requester.id === user?.id;

        if (hasSent) {
            return (
                <Button disabled onClick={(e) => {
                    e.stopPropagation();
                }}>
                    Zbro request sent
                </Button>
            )
        }

        return (
            <Button borderRadius="50" fontWeight="bold" onClick={(e) => {
                e.stopPropagation();
                acceptFriendRequest(friendRequest);
            }}>Accept Zbro request</Button>
        )
    }

    if (isFriend) {
        return (
            <Button borderRadius="50" fontWeight="bold" onClick={(e) => {
                e.stopPropagation();
                openSendZbraModal(userFind.user);
            }}>
                Send Zbra
            </Button>
        )
    }

    return (
        <Button borderRadius="50" fontWeight="bold" onClick={(e) => {
            e.stopPropagation();
            sendFriendRequest(userFind);
        }}>Send Zbro request</Button>
    )
}

export default function FindFriends() {
    const [search, setSearch] = useState('');
    const [refresh, setRefresh] = useState(0);
    const [users, setUsers] = useState<Array<UserFind>>([]);
    const { findUsersApi } = useApi();

    // Send Zbra modal
    const [friend, setFriend] = useState<Friend|null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const openSendZbraModal = (friend: Friend) => {
        setFriend(friend);
        onOpen();
    }
    // End Send Zbra modal
    
    useEffect(() => {
        handleChange();
    }, [search, refresh]);

    const handleChange = async () => {
        try {
            const response = await findUsersApi(search);

            setUsers(response.data);
        } catch (e: unknown) {

        }
    }
    
    return (
        <>
            <Container>
                <PendingFriendRequestsComponent refresh={refresh} setRefresh={setRefresh} />
                <Box py={5}>
                    <Heading as='h1' size='2xl' marginBottom="3">
                        Add Zbro
                    </Heading>
                    <Box>
                        <Input
                            id="search"
                            name="search"
                            type="text"
                            placeholder="Start typing to find some new zbros!"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </Box>
                </Box>
                { users.length !== 0 ?
                    <Box py="5">
                        { users.map((userFind) => {
                            return (
                                <FriendItem friend={userFind.user} key={userFind.id}>
                                    <ButtonFindFriend userFind={userFind} openSendZbraModal={openSendZbraModal} refresh={refresh} setRefresh={setRefresh} />
                                </FriendItem>
                            )
                        })}
                    </Box>
                : null }

                <SendZbraModal friend={friend} isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
            </Container>
        </>
    )
}