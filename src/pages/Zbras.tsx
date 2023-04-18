import { Box, Button, Card, CardBody, Container, Grid, Heading, HStack, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TypeWriter from 'typewriter-effect';
import Feed from "../@ts/Feed";
import zbraLogo from "../assets/images/zbra_logo_dark.png";
import FeedItem from "../components/FeedItem";
import useApi from "../hooks/useApi";

const Zbras = () => {
    /* @TODO quand on a pas de Zbro, on est redirigé vers la page d'ajout de Zbro */

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
                        <Grid py="5" templateColumns={{base: "repeat(2, 1fr)", sm: "repeat(3, 1fr)"}}>
                            { feeds.length ?
                                feeds.map((feed) => {
                                    return (
                                        <FeedItem
                                            feed={feed}
                                            key={feed.id}
                                        />
                                    );
                                })
                            : (
                                <FeedItem feed={null} />
                            )}
                        </Grid>
                    </CardBody>
                </Card>
                <HStack py="5" justifyContent="center">
                    {/* TODO rendre le logo un peu organique, qu'il bouge de temps en temps, et quand tu cliques dessus ça fait grandir la liste de zbro au dessus */}
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
                            <Image src={zbraLogo} alt="Zbra logo" maxW="100%" />
                        </Button>
                    </Link>
                </HStack>
            </Container>
        </>
    );
}

export default Zbras;