import { Avatar, Box, Stack } from "@chakra-ui/react";
import { ReactNode } from 'react';
import Friend from "../@ts/Friend";

const FriendItem = ({ children, friend }: { children: ReactNode, friend: Friend }) => {
    return (
        <Stack 
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            borderRadius="full"
            bg="white"
            color="brand.900"
            px="2"
            mb="4"
            border="1px solid"
            borderColor="brand.900"
        >
            <Avatar name={friend.username} src={friend.avatar} size="sm" />

            <Box p="1" flex="auto">
                <Box display='flex' alignItems='baseline'>
                    {friend.username}
                </Box>
            </Box>

            <Box px="1" py="1">
                {children}
            </Box>
        </Stack>
    )
}

export default FriendItem;