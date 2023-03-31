import { Avatar, AvatarBadge, Box } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Friend from "../@ts/Friend";

const FriendItemV2 = ({ friend}: { friend: Friend }) => {
    const navigate = useNavigate();

    return (
        <Link
            to={`/zbros/${friend.id}`}
        >
            <Box 
                py="3"
                overflow="hidden"
                _hover={{animation: "shake 1s", animationIterationCount: "inifinite"}}
            >
                <Avatar name={friend.username} src={friend.avatar} size="lg">
                    <AvatarBadge
                        bgColor="brand.900"
                        placement="top-end"
                        color="white"
                        borderRadius="full"
                        fontSize="md"
                        fontWeight="normal"
                        p="2"
                        border="none"
                        w="8"
                        h="8"
                    >
                        {Math.floor(Math.random() * 15)} {/* @TODO unread zbra between friend and user */}
                    </AvatarBadge>
                </Avatar>
                <Box color="brand.900" fontWeight="medium">
                    {friend.username}
                </Box>
            </Box>
        </Link>
    )
}

export default FriendItemV2;