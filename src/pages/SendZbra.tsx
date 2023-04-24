import {
    Box,
    Button,
    Container,
    Heading,
    Input,
    useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Feed from "../@ts/Feed";
import Friend from "../@ts/Friend";
import FriendLineItem from "../components/Friend/FriendLineItem";
import SendZbraModal from "../components/SendZbraModal";
import useApi from "../hooks/useApi";

export default function SendZbra() {
    const [feeds, setFeeds] = useState<Array<Feed>>([]);
    const [search, setSearch] = useState<string>("");
    const [friends, setFriends] = useState<Array<Friend>>([]);
    const { getFeedsApi, getFriendsApi } = useApi();

    // Send Zbra modal
    const [friend, setFriend] = useState<Friend | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        handleChange();
    }, [search]);

    useEffect(() => {
        getFeeds();
    }, []);

    const handleChange = async () => {
        try {
            const response = await getFriendsApi(search);

            setFriends(response.data);
        } catch (e: unknown) {}
    };

    const getFeeds = async () => {
        try {
            const response = await getFeedsApi();

            setFeeds(response.data);
        } catch (error) {
            // @TODO deal with this later
        }
    };

    const openSendZbraModal = (friend: Friend) => {
        setFriend(friend);
        onOpen();
    };

    return (
        <>
            <Container py="5">
                <Box>
                    {feeds.length !== 0 && (
                        <>
                            <Heading as="h4">Recent</Heading>
                            <Box py="5">
                                {feeds.slice(0, 3).map((feed) => {
                                    return (
                                        <FriendLineItem
                                            friend={feed.friend}
                                            key={feed.zbra.id}
                                        >
                                            <Button
                                                borderRadius="50"
                                                fontWeight="bold"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openSendZbraModal(
                                                        feed.friend
                                                    );
                                                }}
                                            >
                                                Zbra
                                            </Button>
                                        </FriendLineItem>
                                    );
                                })}
                            </Box>
                        </>
                    )}
                </Box>
                <Box>
                    <Heading as="h4" py={5}>
                        Zbros
                    </Heading>
                    <Box>
                        <Input
                            id="search"
                            name="search"
                            type="text"
                            placeholder="Start typing to filter..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Box>
                    {friends.length !== 0 ? (
                        <Box py="5">
                            {friends.map((friend) => {
                                return (
                                    <FriendLineItem
                                        friend={friend}
                                        key={friend.id}
                                    >
                                        <Button
                                            borderRadius="50"
                                            fontWeight="bold"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openSendZbraModal(friend);
                                            }}
                                        >
                                            Zbra
                                        </Button>
                                    </FriendLineItem>
                                );
                            })}
                        </Box>
                    ) : null}
                </Box>

                <SendZbraModal
                    friend={friend}
                    isOpen={isOpen}
                    onClose={onClose}
                    onOpen={onOpen}
                />
            </Container>
        </>
    );
}
