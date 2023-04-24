import {
    Box,
    Button,
    Center,
    Container,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { FaSearch, FaUserPlus } from "react-icons/fa";
import Friend from "../@ts/Friend";
import FriendRequest from "../@ts/FriendRequest";
import User from "../@ts/User";
import ShareUser from "../components/Friend/ShareUser";
import FriendLineItem from "../components/Friend/FriendLineItem";
import PendingFriendRequestsComponent from "../components/PendingFriendRequestsComponent";
import SendZbraModal from "../components/SendZbraModal";
import useApi from "../hooks/useApi";

interface UserFind {
    id: string;
    friendRequest: FriendRequest | null;
    user: Friend;
    isFriend: boolean;
}

export default function FindFriends() {
    const user = useAuthUser()() as User;

    const [search, setSearch] = useState("");
    const [refresh, setRefresh] = useState(0);
    const [users, setUsers] = useState<Array<UserFind>>([]);
    const { findUsersApi } = useApi();

    // Send Zbra modal
    const [friend, setFriend] = useState<Friend | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const openSendZbraModal = (friend: Friend) => {
        setFriend(friend);
        onOpen();
    };
    // End Send Zbra modal

    useEffect(() => {
        handleChange();
    }, [search, refresh]);

    const handleChange = async () => {
        try {
            const response = await findUsersApi(search);

            setUsers(response.data);
        } catch (e: unknown) {}
    };

    return (
        <>
            <Box
                py={5}
                bg="brand.900"
                borderBottomLeftRadius="3xl"
                borderBottomRightRadius="3xl"
            >
                <Container px="8">
                    <Box>
                        <InputGroup pb="3">
                            <Input
                                id="search"
                                name="search"
                                type="text"
                                placeholder="Look for a new zbro..."
                                borderRadius="full"
                                h="50px"
                                bg="white"
                                _placeholder={{ color: "brand.900" }}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <InputRightElement
                                top="5px"
                                right="5px"
                                color="brand.900"
                            >
                                <FaSearch />
                            </InputRightElement>
                        </InputGroup>

                        <ShareUser user={user} />
                    </Box>
                </Container>
            </Box>
            <Container px="8">
                {search !== "" ? (
                    <Box py="5">
                        <Heading
                            as="h1"
                            size="sm"
                            marginBottom="3"
                            display="flex"
                        >
                            Results{" "}
                            <Text fontWeight="normal">({users.length})</Text>
                        </Heading>
                        {users.length !== 0 ? (
                            users.map((userFind) => {
                                return (
                                    <FriendLineItem
                                        friend={userFind.user}
                                        key={userFind.id}
                                    >
                                        <ButtonFindFriend
                                            userFind={userFind}
                                            openSendZbraModal={() =>
                                                alert("Not implemented")
                                            }
                                            refresh={refresh}
                                            setRefresh={setRefresh}
                                        />
                                    </FriendLineItem>
                                );
                            })
                        ) : (
                            <Center py="5">No results found</Center>
                        )}
                    </Box>
                ) : (
                    <PendingFriendRequestsComponent
                        refresh={refresh}
                        setRefresh={setRefresh}
                    />
                )}
            </Container>
        </>
    );
}

/* TODO change them buttons */
const ButtonFindFriend = ({
    userFind,
    openSendZbraModal,
    refresh,
    setRefresh,
}: {
    userFind: UserFind;
    openSendZbraModal: (friend: Friend) => void;
    refresh: number;
    setRefresh: (refresh: number) => void;
}) => {
    const { sendFriendRequestApi, acceptFriendRequestApi } = useApi();
    const toast = useToast();
    const user = useAuthUser()();

    const [friendRequest, setFriendRequest] = useState<FriendRequest | null>(
        userFind.friendRequest
    );
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
                status: "success",
            });
        } catch (e: unknown) {}
    };

    const acceptFriendRequest = async (friendRequest: FriendRequest) => {
        try {
            await acceptFriendRequestApi(friendRequest);

            toast({
                title: `${friendRequest.requester.username} is now a zbro. Go send him a zbra!`,
                status: "success",
            });

            setFriendRequest(null);
            setRefresh(++refresh);
            setIsFriend(true);
        } catch (error) {
            // @TODO deal with this later
        }
    };

    if (friendRequest) {
        const hasSent = friendRequest.requester.id === user?.id;

        if (hasSent) {
            return (
                <Button
                    disabled
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    Sent
                </Button>
            );
        }

        return (
            <Button
                borderRadius="50"
                fontWeight="bold"
                onClick={(e) => {
                    e.stopPropagation();
                    acceptFriendRequest(friendRequest);
                }}
            >
                Accept Zbro request
            </Button>
        );
    }

    if (isFriend) {
        return (
            <Button
                borderRadius="50"
                fontWeight="bold"
                onClick={(e) => {
                    e.stopPropagation();
                    openSendZbraModal(userFind.user);
                }}
            >
                Zbra
            </Button>
        );
    }

    return (
        <a
            style={{ marginRight: ".5rem" }}
            onClick={(e) => {
                e.preventDefault();
                sendFriendRequest(userFind);
            }}
        >
            <FaUserPlus size="18" />
        </a>
    );
};
