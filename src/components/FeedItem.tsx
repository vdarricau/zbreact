import { Avatar, AvatarBadge, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Feed from "../@ts/Feed";

const FeedItem = ({ feed }: { feed: Feed|null }) => {
    /* @TODO implement websocket here for notification bubble */

    if (feed === null) {
        return (
            <Link to="/zbros/add">
            <Box 
                py="3"
                overflow="hidden"
                _hover={{animation: "shake 1s", animationIterationCount: "inifinite"}}
            >
                <Avatar size="lg">
                </Avatar>
                <Box color="brand.900" fontWeight="medium">
                    Add zbros
                </Box>
            </Box>
            </Link>
        )
    }

    return (
        <Link
            to={`/zbros/${feed.friend.id}`}
        >
            <Box 
                py="3"
                overflow="hidden"
                _hover={{animation: "shake 1s", animationIterationCount: "inifinite"}}
            >
                <Avatar name={feed.friend.username} src={feed.friend.avatar} size="lg">
                    { 0 !== feed.countUnreadZbras && 
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
                    }
                </Avatar>
                <Box color="brand.900" fontWeight="medium">
                    {feed.friend.username}
                </Box>
            </Box>
        </Link>
    )
}

export default FeedItem;