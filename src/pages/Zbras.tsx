import { Box, Button, Container, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { BiBomb, BiRocket } from "react-icons/bi";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import Zbra from "../@ts/Zbra";
import FriendItem from "../components/FriendItem";
import useApi from "../hooks/useApi";

const Zbras = () => {
    const [zbras, setZbras] = useState<Array<Zbra>>([]);
    const user = useAuthUser()();
    const { getZbrasApi } = useApi();

    const getZbras = async () => {
        try {
            const response = await getZbrasApi();

            setZbras(response.data);
        } catch (error) {
            // @TODO deal with this later
        }
    }

    useEffect(() => {
        getZbras();
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
                { zbras.length !== 0 ?
                    <Box py="5">
                        { zbras.map((zbra) => {
                            let friend = zbra.receiver;
                            let isSender = true;
                            let date = new Date(zbra.createdAt);

                            if (zbra.receiver.id === user?.id) {
                                friend = zbra.sender;
                                isSender = false;
                            }

                            return (
                                <FriendItem friend={friend} key={zbra.id}>
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
                : null }
            </Container>
        </>
    );
}

export default Zbras;