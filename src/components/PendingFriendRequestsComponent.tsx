import { Box, Center, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaCheck, FaChevronRight, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import FriendRequest from "../@ts/FriendRequest";
import FriendLineItem from "./Friend/FriendLineItem";
import useApi from "../hooks/useApi";

export default function PendingFriendRequestsComponent({
    refresh,
    setRefresh,
}: {
    refresh: number;
    setRefresh: (refresh: number) => void;
}) {
    const [friendRequests, setFriendRequests] = useState<Array<FriendRequest>>(
        []
    );
    const {
        acceptFriendRequestApi,
        cancelFriendRequestApi,
        getFriendRequestsApi,
    } = useApi();
    const toast = useToast();

    useEffect(() => {
        getFriendRequests();
    }, [refresh]);

    const getFriendRequests = async () => {
        try {
            const response = await getFriendRequestsApi();

            setFriendRequests(response.data);
        } catch (error) {
            // @TODO deal with this later
        }
    };

    const acceptFriendRequest = async (friendRequest: FriendRequest) => {
        try {
            const response = await acceptFriendRequestApi(friendRequest);

            toast({
                title: `${friendRequest.requester.username} is now a zbro. Go send him a zbra!`,
                status: "success",
            });

            setRefresh(++refresh);
            await getFriendRequests();
        } catch (error) {
            // @TODO deal with this later
        }
    };

    const cancelFriendRequest = async (friendRequest: FriendRequest) => {
        try {
            const response = await cancelFriendRequestApi(friendRequest);

            toast({
                title: `${friendRequest.requester.username} won't be your zbro.`,
                status: "error",
            });
            await getFriendRequests();
        } catch (error) {
            // @TODO deal with this later
        }
    };

    return (
        <>
            <Box py={5}>
                <Flex justifyContent="space-between">
                    <Heading as="h1" size="sm" marginBottom="3" display="flex">
                        Invites{" "}
                        <Text fontWeight="normal">
                            ({friendRequests.length})
                        </Text>
                    </Heading>
                    <Link to="">
                        {" "}
                        {/* TODO */}
                        <Center fontSize="xs">
                            Sent{" "}
                            <FaChevronRight
                                style={{ marginLeft: "3" }}
                                size="8"
                            />
                        </Center>
                    </Link>
                </Flex>
                {friendRequests.length !== 0 ? (
                    <Box>
                        {friendRequests.map((friendRequest) => {
                            return (
                                <FriendLineItem
                                    friend={friendRequest.requester}
                                    key={friendRequest.id}
                                >
                                    <Flex py="3">
                                        <a
                                            style={{ marginRight: 10 }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                acceptFriendRequest(
                                                    friendRequest
                                                );
                                            }}
                                        >
                                            <FaCheck
                                                color="#29B149"
                                                size="18"
                                            />
                                        </a>
                                        <a
                                            onClick={(e) => {
                                                e.preventDefault();
                                                cancelFriendRequest(
                                                    friendRequest
                                                );
                                            }}
                                        >
                                            <FaTimes
                                                color="#FC4545"
                                                size="18"
                                            />
                                        </a>
                                    </Flex>
                                </FriendLineItem>
                            );
                        })}
                    </Box>
                ) : (
                    <Text textAlign="center" mt="5">
                        Nothing to see here
                    </Text>
                )}
            </Box>
        </>
    );
}
