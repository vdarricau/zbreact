import { Avatar, Box } from "@chakra-ui/react";
import Friend from "../../@ts/Friend";

export default function FriendAvatarItem({
    friend,
    children,
}: {
    friend: Friend;
    children?: React.ReactNode | React.ReactNode[] | undefined;
}) {
    return (
        <Box py="3" overflow="hidden">
            <Avatar name={friend.username} src={friend.avatar} size="lg">
                {children}
            </Avatar>
            <Box color="brand.900" fontWeight="medium">
                {friend.username}
            </Box>
        </Box>
    );
}
