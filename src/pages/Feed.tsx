import {
    Box,
    Button,
    Card,
    CardBody,
    Center,
    Container,
    Grid,
    Heading,
    HStack,
    Image,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaPaperPlane, FaPlane } from "react-icons/fa";
import { Link } from "react-router-dom";
import TypeWriter from "typewriter-effect";
import Conversation from "../@ts/Conversation";
import zbraLogo from "../assets/images/zbra_logo_dark.png";
import ConversationItem from "../components/Conversation/ConversationItem";
import SendZbraModal from "../components/SendZbra/SendZbraModal";
import useApi from "../hooks/useApi";

const Feed = () => {
    /* @TODO quand on a pas de Zbro, on est redirigé vers la page d'ajout de Zbro */
    const sendZbraModal = useDisclosure();
    const [conversations, setConversations] = useState<Array<Conversation>>([]);
    const { getConversationsApi } = useApi();

    const getConversations = async () => {
        try {
            const response = await getConversationsApi();

            setConversations(response.data);
        } catch (error) {
            // @TODO deal with this later
        }
    };

    useEffect(() => {
        getConversations();
    }, []);

    return (
        <>
            <Container h="100%">
                <Grid gridTemplateRows="auto 1fr auto" h="100%">
                    <Box py="8">
                        <Heading fontSize="2xl">
                            Feels like a good day to send a&nbsp;
                            <Box display="inline">
                                <TypeWriter
                                    options={{
                                        strings: [
                                            "zbracadabra.",
                                            "zbracheotomy.",
                                            "zprout.",
                                        ],
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </Box>
                        </Heading>
                        <Button
                            w="85%"
                            mx="auto"
                            mt="5"
                            display="block"
                            position="relative"
                            bg="brand.900"
                            color="white"
                            textAlign="left"
                            fontSize="xl"
                            fontWeight="bold"
                            borderRadius="xl"
                            onClick={sendZbraModal.onOpen}
                        >
                            <Text>Send a ZBRA</Text>
                            <Box
                                position="absolute"
                                right="5"
                                top="50%"
                                transform="translateY(-50%)"
                            >
                                <FaPaperPlane />
                            </Box>
                        </Button>
                    </Box>
                    <Card
                        textAlign="center"
                        bg="white"
                        boxShadow="3px 3px 7px 0px"
                        color="brand.900"
                        borderRadius="3xl"
                        overflow="auto"
                    >
                        <CardBody>
                            <Grid
                                templateColumns={{
                                    base: "repeat(3, 33%)",
                                    sm: "repeat(4, 25%)",
                                }}
                            >
                                {conversations.length ? (
                                    conversations.map((conversation) => {
                                        return (
                                            <ConversationItem
                                                conversation={conversation}
                                                key={conversation.id}
                                            />
                                        );
                                    })
                                ) : (
                                    <ConversationItem conversation={null} />
                                )}
                            </Grid>
                        </CardBody>
                    </Card>
                    <Center
                        py="10"
                        position="relative"
                        _before={{
                            content: "''",
                            position: "absolute",
                            width: "100%",
                            opacity: "0.5",
                            height: "10rem",
                            bgImage:
                                "linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0));",
                            top: "0",
                            pointerEvents: "none",
                            transform: "translateY(-100%)",
                            borderRadius: "full",
                        }}
                    >
                        {/* TODO rendre le logo un peu organique, qu'il bouge de temps en temps, et quand tu cliques dessus ça fait grandir la liste de zbro au dessus */}
                        <Button
                            h="70px"
                            w="70px"
                            p="0"
                            borderRadius="full"
                            transition="all 0.1s ease-out"
                            bgColor="brand.900"
                            _hover={{ bgColor: "brand.500" }}
                            onClick={sendZbraModal.onOpen}
                        >
                            <Image src={zbraLogo} alt="Zbra logo" maxW="100%" />
                        </Button>
                    </Center>
                </Grid>
            </Container>

            <SendZbraModal
                isOpen={sendZbraModal.isOpen}
                onClose={sendZbraModal.onClose}
            />
        </>
    );
};

export default Feed;
