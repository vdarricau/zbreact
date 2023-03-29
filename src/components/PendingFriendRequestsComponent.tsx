import { Box, Button, Heading, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FriendRequest from "../@ts/FriendRequest";
import FriendItem from "../components/FriendItem";
import useApi from "../hooks/useApi";

export default function PendingFriendRequestsComponent(
    { refresh, setRefresh }: 
    { refresh: number, setRefresh: (refresh: number) => void }
) {
    const [friendRequests, setFriendRequests] = useState<Array<FriendRequest>>([]);
    const { acceptFriendRequestApi, getFriendRequestsApi } = useApi();
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
    }

    const acceptFriendRequest = async (friendRequest: FriendRequest) => {
        try {
            const response = await acceptFriendRequestApi(friendRequest);

            toast({
                title: `${friendRequest.requester.username} is now a zbro. Go send him a zbra!`,
                status: 'success'
            })

            setRefresh(++refresh);
            await getFriendRequests();
        } catch (error) {
            // @TODO deal with this later
        }
    }

    return (
        <>
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
        </>
    )
}