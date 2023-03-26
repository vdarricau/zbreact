import { Avatar, Box, Stack } from "@chakra-ui/react";
import { ReactNode } from 'react';
import { useNavigate } from "react-router-dom";
import Friend from "../@ts/Friend";

const FriendItem = ({ children, friend }: { children: ReactNode, friend: Friend }) => {
    const navigate = useNavigate();

    return (
        <Stack 
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            _even={{ backgroundColor: 'orange'}}
            _odd={{ backgroundColor: 'black'}}
            px="2"
            borderRadius="10"
            onClick={() => navigate(`/zbros/${friend.id}`)}
        >
            <Avatar name={friend.username} src={friend.avatar} />

            <Box p="1" flex="auto">
                <Box display='flex' alignItems='baseline'>
                    {/* <Badge borderRadius='full' px='2' colorScheme='orange'>
                        New
                    </Badge> */}
                    &nbsp;
                    {friend.username}
                </Box>
            </Box>

            <Box px="1" py="6">
                {children}
            </Box>
        </Stack>
    )
}

export default FriendItem;