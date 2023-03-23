import { Box, Container, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { BiBomb, BiRocket } from "react-icons/bi";
import ReactTimeAgo from "react-time-ago";
import Zbra from "../@ts/Zbra";
import api from "../api/api";
import FriendItem from "../components/FriendItem";

const Zbras = () => {
    const [zbras, setZbras] = useState<Array<Zbra>>([]);
    const user = useAuthUser()();
    const authHeader = useAuthHeader();

    const getZbras = async () => {
        try {
            const response = await api.get('/zbras', {
                headers: {
                    Authorization: authHeader(),
                }
            });

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
                { zbras.length !== 0 ?
                    <Box py="5">
                        { zbras.map((zbra) => {
                            let friend = zbra.sender;
                            let isSender = true;
                            let date = new Date(zbra.createdAt);

                            if (zbra.receiver.id === user?.id) {
                                friend = zbra.receiver;
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