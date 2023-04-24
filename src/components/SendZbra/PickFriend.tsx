import { Grid, Heading, ModalBody } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Feed from "../../@ts/Feed";
import Friend from "../../@ts/Friend";
import FriendAvatarItem from "../../components/Friend/FriendAvatarItem";
import useApi from "../../hooks/useApi";
import SearchInput from "./SearchInput";

export default function PickFriend({
    setFriend,
}: {
    setFriend: (friend: Friend) => void;
}) {
    const [feeds, setFeeds] = useState<Array<Feed>>([]);
    const [search, setSearch] = useState<string>("");
    const { getFeedsApi } = useApi();

    useEffect(() => {
        getFeeds();
    }, []);

    const getFeeds = async () => {
        try {
            const response = await getFeedsApi();

            setFeeds(response.data);
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
                    {feeds
                        .filter((feed) => feed.friend.username.includes(search))
                        .map((feed) => {
                            return (
                                <a
                                    key={feed.friend.id}
                                    onClick={(e) => {
                                        e.preventDefault;
                                        setFriend(feed.friend);
                                    }}
                                >
                                    <FriendAvatarItem
                                        friend={feed.friend}
                                        key={feed.friend.id}
                                    />
                                </a>
                            );
                        })}
                </Grid>
            </ModalBody>
        </>
    );
}
