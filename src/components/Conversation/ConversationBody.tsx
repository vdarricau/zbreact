import { Avatar, Flex, Image, Skeleton, Stack, Text } from "@chakra-ui/react";
import Friend from "../../@ts/Friend";
import Message from "../../@ts/Message";

export default function ConversationBody({
    messages,
    friend,
}: {
    messages: Message[] | null;
    friend: Friend | null;
}) {
    if (null === messages) {
        return <SkeletonStack />;
    }

    return (
        <>
            {messages.map((message) => {
                if (message.sender.id === friend?.id) {
                    return (
                        <Message
                            key={message.id}
                            message={message}
                            friendIsSender={true}
                        >
                            <Avatar
                                name={message.sender.username}
                                src={message.sender.avatar}
                                mr="2"
                            />
                        </Message>
                    );
                }

                return (
                    <Message
                        key={message.id}
                        message={message}
                        friendIsSender={false}
                    />
                );
            })}
        </>
    );
}

const attributes = {
    friend: {
        justify: "flex-start",
        bg: "white",
        color: "black",
        border: "1px solid #EEEEEE",
        zbraColor: "brand.900",
        rotate: "rotate(3deg)",
    },
    me: {
        justify: "flex-end",
        bg: "brand.900",
        color: "white",
        border: "none",
        zbraColor: "white",
        rotate: "rotate(-3deg)",
    },
};

function Message({
    message,
    friendIsSender,
    children,
}: {
    message: Message;
    friendIsSender: boolean;
    children?: JSX.Element;
}) {
    const messageAttribute = friendIsSender
        ? attributes["friend"]
        : attributes["me"];

    return (
        <Flex w="100%" justify={messageAttribute.justify}>
            {children}

            {null !== message.zbra ? (
                <Flex
                    position="relative"
                    mt="1"
                    mb="-1.5rem"
                    alignItems={messageAttribute.justify}
                    flexDirection="column"
                    maxW="21.875rem"
                >
                    <Image
                        borderRadius="3xl"
                        src={message.zbra?.imageUrl}
                        h={message.zbra?.imageHeight}
                    />
                    <Flex
                        display="inline-flex"
                        bg={messageAttribute.bg}
                        color={messageAttribute.zbraColor}
                        border={messageAttribute.border}
                        borderRadius="2xl"
                        py="2"
                        px="3"
                        maxW="17.5rem"
                        position="relative"
                        bottom="2rem"
                        transform={messageAttribute.rotate}
                        zIndex="1"
                    >
                        <Text fontWeight="bold" fontSize="xl">
                            {message.zbra?.text}
                        </Text>
                    </Flex>
                </Flex>
            ) : (
                <Flex
                    bg={messageAttribute.bg}
                    color={messageAttribute.color}
                    border={messageAttribute.border}
                    borderRadius="md"
                    minW="6.25rem"
                    maxW="21.875rem"
                    my="1"
                    p="3"
                >
                    <Text whiteSpace="pre-line" overflowX="auto">
                        {message.message}
                    </Text>
                </Flex>
            )}
        </Flex>
    );
}

const SkeletonStack = () => {
    return (
        <Stack>
            <Skeleton height="48px" w="40%" />
            <Skeleton height="48px" w="60%" />
            <Skeleton height="96px" w="300px" />
            <Skeleton height="48px" w="40%" alignSelf="end" />
            <Skeleton height="48px" w="80%" alignSelf="end" />
            <Skeleton height="48px" w="60%" />
            <Skeleton height="96px" w="300px" alignSelf="end" />
            <Skeleton height="48px" w="40%" alignSelf="end" />
            <Skeleton height="48px" w="60%" alignSelf="end" />
            <Skeleton height="48px" w="70%" />
        </Stack>
    );
};
