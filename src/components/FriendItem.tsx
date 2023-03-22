import { Badge, Box, Image, Stack } from "@chakra-ui/react"
import avatar from "../assets/avatar.png";
import Friend from "../@ts/Friend";
import { ReactNode } from 'react';

const FriendItem = ({ children, friend }: { children: ReactNode, friend: Friend }) => {
    return (
        <Stack 
            direction="row"
            alignItems="center"
            justifyContent="space-between"
        >
            <Image 
                src={friend.avatar ? friend.avatar : avatar} 
                alt="friend avatar"
                h="50px"
                borderRadius="50"
            />

            <Box p='6' marginRight="auto">
                <Box display='flex' alignItems='baseline'>
                    <Badge borderRadius='full' px='2' colorScheme='teal'>
                        New
                    </Badge>
                    &nbsp;
                    {friend.username}
                </Box>
            </Box>

            <Box p='6' justifySelf="end">
                {children}
            </Box>
        </Stack>
    )
}

export default FriendItem;