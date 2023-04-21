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
                        <Message
                            key={zbra.id}
                            message={zbra.message}
                            justify="flex-end"
                            bg="brand.900"
                            color="white"
                        />
                    );
                }
                
                return (
                    <Message 
                        key={zbra.id}
                        message={zbra.message}
                        justify="flex-start"
                        bg="white"
                        color="black"
                        border="1px solid #EEEEEE"
                    >
                        <Avatar name={zbra.sender.username} src={zbra.sender.avatar} mr="2" />
                    </Message>
                );
            })}
        </>
    )
}

function Message(
    {message, justify, bg, color, border, children}: 
    {message: string, justify: string, bg: string, color: string, border?: string, children?: JSX.Element}
) {
    return (
        <Flex w="100%" justify={justify}>
            {children}
            <Flex
                bg={bg}
                color={color}
                border={border}
                borderRadius="md"
                minW="100px"
                maxW="350px"
                my="1"
                p="3"
                wordBreak="break-all"
            >
                <Text whiteSpace="pre-line">{message}</Text>
            </Flex>
        </Flex>
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