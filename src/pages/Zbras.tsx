import { Box, Button, Container, Heading, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { BiBomb, BiRocket } from "react-icons/bi";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import Feed from "../@ts/Feed";
import FriendItem from "../components/FriendItem";
import useApi from "../hooks/useApi";

const Zbras = () => {
    const [feeds, setFeeds] = useState<Array<Feed>>([]);
    const user = useAuthUser()();
    const { getFeedsApi } = useApi();

    const getFeeds = async () => {
        try {
            const response = await getFeedsApi();

            setFeeds(response.data);
        } catch (error) {
            // @TODO deal with this later
        }
    }

    useEffect(() => {
        getFeeds();
    }, []);

    return (
        <>
            <Container>
                <Box py="5">
                    <Link to={'/zbra/send'}>
                        <Button 
                            w="100%" 
                            h="70px"
                            fontSize="2xl"
                            colorScheme="orange"
                            transition="all 0.5s ease-out"
                        >
                            SEND ZBRAAAA
                        </Button>
                    </Link>
                </Box>
                { feeds.length !== 0 &&
                    <Box py="5">
                        { feeds.map((feed) => {
                            let isSender = true;
                            let date = new Date(feed.updatedAt);

                            if (feed.zbra.receiver.id === user?.id) {
                                isSender = false;
                            }

                            return (
                                <FriendItem friend={feed.friend} key={feed.zbra.id}>
                                    <Stack direction="row">
                                        <Box>
                                            <ReactTimeAgo date={date} locale="en-US"/>
                                        </Box>
                                        <Box>
                                            { isSender ? <BiRocket fontSize="20px" /> : <BiBomb fontSize="20px" />}
                                        </Box>
                                    </Stack>
                                </FriendItem>
                            )
                        })}
                    </Box>
                }
            </Container>
        </>
    );
}

export default Zbras;