import { Grid, Heading, ModalBody } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Conversation from "../../@ts/Conversation";
import Friend from "../../@ts/Friend";
import FriendAvatarItem from "../../components/Friend/FriendAvatarItem";
import useApi from "../../hooks/useApi";
import SearchInput from "./SearchInput";

export default function PickFriend({
    setFriend,
}: {
    setFriend: (friend: Friend) => void;
}) {
    const [conversations, setConversations] = useState<Array<Conversation>>([]);
    const [search, setSearch] = useState<string>("");
    const { getConversationsApi } = useApi();

    useEffect(() => {
        getConversations();
    }, []);

    const getConversations = async () => {
        try {
            const response = await getConversationsApi();

            setConversations(response.data);
        } catch (error) {
            // @TODO deal with this later
        }
    };

    return (
        <>
            <ModalBody pt="2rem">
                <Heading size="lg" mb={10} textAlign="center">
                    Pick a zbro !
                </Heading>
                <SearchInput search={search} setSearch={setSearch} />
                <Grid
                    mt="3"
                    templateColumns={{
                        base: "repeat(3, 33%)",
                        sm: "repeat(4, 25%)",
                    }}
                >
                    {conversations
                        .filter((conversation) =>
                            conversation.friend.username.includes(search)
                        )
                        .map((conversation) => {
                            return (
                                <a
                                    key={conversation.friend.id}
                                    onClick={(e) => {
                                        e.preventDefault;
                                        setFriend(conversation.friend);
                                    }}
                                >
                                    <FriendAvatarItem
                                        friend={conversation.friend}
                                        key={conversation.friend.id}
                                    />
                                </a>
                            );
                        })}
                </Grid>
            </ModalBody>
        </>
    );
}
