import { Avatar, AvatarBadge, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Conversation from "../../@ts/Conversation";
import FriendAvatarItem from "../Friend/FriendAvatarItem";

const ConversationItem = ({
    conversation,
}: {
    conversation: Conversation | null;
}) => {
    /* @TODO implement websocket here for notification bubble */

    if (conversation === null) {
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
        <Link to={`/conversations/${conversation.id}`}>
            <FriendAvatarItem friend={conversation.friend}>
                {0 !== conversation.countUnreadMessages && (
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
                        {conversation.countUnreadMessages}
                    </AvatarBadge>
                )}
            </FriendAvatarItem>
        </Link>
    );
};

export default ConversationItem;
