import { Avatar, AvatarBadge, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Feed from "../@ts/Feed";
import FriendAvatarItem from "./Friend/FriendAvatarItem";

const FeedItem = ({ feed }: { feed: Feed | null }) => {
    /* @TODO implement websocket here for notification bubble */

    if (feed === null) {
        return (
            <Link to="/zbros/add">
                <Box py="3" overflow="hidden">
                    <Avatar size="lg"></Avatar>
                    <Box color="brand.900" fontWeight="medium">
                        Add zbros
                    </Box>
                </Box>
            </Link>
        );
    }

    return (
        <Link to={`/zbros/${feed.friend.id}`}>
            <FriendAvatarItem friend={feed.friend}>
                {0 !== feed.countUnreadZbras && (
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
                        {feed.countUnreadZbras}
                    </AvatarBadge>
                )}
            </FriendAvatarItem>
        </Link>
    );
};

export default FeedItem;
