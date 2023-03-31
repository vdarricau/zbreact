import { Box, Button, Card, CardBody, Container, Flex, Grid, Heading, HStack, Image, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { BiBomb, BiRocket } from "react-icons/bi";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import Feed from "../@ts/Feed";
import FriendItem from "../components/FriendItem";
import FriendItemV2 from "../components/FriendItemV2";
import useApi from "../hooks/useApi";
import TypeWriter from 'typewriter-effect'
import Logo from "../components/Logo";
import zbraLogo from "../assets/images/zbra_logo_dark.png";

const Zbras = () => {
    const [feeds, setFeeds] = useState<Array<Feed>>([]);
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
                <Heading py="8" fontSize="2xl">
                    Feels like a good day to send a: <Box><TypeWriter options={{
                        strings: ['zbracadabra.', 'zbracheotomy.', 'little message of zbrhope.'],
                        autoStart: true,
                        loop: true,
                    }}/></Box>
                </Heading>
                <Card
                    textAlign="center"
                    bg="white" 
                    boxShadow="3px 3px 7px 0px"
                    color="brand.900"
                    borderRadius="3xl"
                >
                    <CardBody>
                        { feeds.length !== 0 &&
                            <Grid py="5" templateColumns={{base: "repeat(2, 1fr)", sm: "repeat(3, 1fr)"}}>
                                { feeds.map((feed) => {
                                    return (
                                        <FriendItemV2
                                            friend={feed.friend}
                                            key={feed.zbra.id}
                                        />
                                    );
                                })}
                            </Grid>
                        }
                    </CardBody>
                </Card>
                <HStack py="5" justifyContent="center">
                    <Heading fontSize="xl">
                        Give it a try
                    </Heading>
                    <Link to={'/zbra/send'}>
                        <Button 
                            h="70px"
                            w="70px"
                            p="0"
                            borderRadius="full"
                            transition="all 0.1s ease-out"
                            bgColor="brand.900"
                            _hover={{bgColor: "brand.500"}}
                        >
                            <Image src={zbraLogo} maxW="100%" />
                        </Button>
                    </Link>
                </HStack>
            </Container>
        </>
    );
}

export default Zbras;