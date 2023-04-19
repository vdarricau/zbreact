import { Avatar, Flex, Skeleton, Stack, Text } from "@chakra-ui/react";
import Friend from "../../@ts/Friend";
import Zbra from "../../@ts/Zbra";

export default function ConversationBody({zbras, friend} : {zbras: Zbra[]|null, friend: Friend|null}) {
    if (null === zbras) {
        return <SkeletonStack />
    }

    return (
        <>
            {zbras.map((zbra) => {
                if (zbra.receiver.id === friend?.id) {
                    return (
                        <Flex key={zbra.id} w="100%" justify="flex-end">
                            <Flex
                                bg="brand.900"
                                color="white"
                                borderRadius="md"
                                minW="100px"
                                maxW="350px"
                                my="1"
                                p="3"
                            >
                                <Text whiteSpace="pre-line">{zbra.message}</Text>
                            </Flex>
                        </Flex>
                    );
                } else {
                    return (
                        <Flex key={zbra.id} w="100%">
                            <Avatar name={zbra.sender.username} src={zbra.sender.avatar} />
                            <Flex
                                bg="white"
                                color="black"
                                border="1px solid #EEEEEE"
                                borderRadius="md"
                                minW="100px"
                                maxW="350px"
                                my="1"
                                mx="2"
                                p="3"
                            >
                                <Text whiteSpace="pre-line">{zbra.message}</Text>
                            </Flex>
                        </Flex>
                    );
                }
            })}
        </>
    )
}

const SkeletonStack = () => {
    return (
        <Stack>
            <Skeleton height='48px' w="40%" />
            <Skeleton height='48px' w="60%" />
            <Skeleton height='96px' w="300px" />
            <Skeleton height='48px' w="40%" alignSelf="end" />
            <Skeleton height='48px' w="80%" alignSelf="end" />
            <Skeleton height='48px' w="60%" />
            <Skeleton height='96px' w="300px" alignSelf="end" />
            <Skeleton height='48px' w="40%" alignSelf="end"/>
            <Skeleton height='48px' w="60%" alignSelf="end" />
            <Skeleton height='48px' w="70%" />
        </Stack>
    )
}