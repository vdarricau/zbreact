import { Avatar, Box, Button, Center, Skeleton, SkeletonCircle, SkeletonText, Text } from "@chakra-ui/react";
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import Friend from "../../@ts/Friend";

export default function ConversationHeader({ friend }: {friend: Friend|null}) {
    const navigate = useNavigate();

    return (
        <>
            <Box
                py="3"
                borderBottom="1px solid #EEEEEE"
            >
                <Skeleton w="80%" m="auto" isLoaded={null !== friend}>
                    <Center>
                        <Button 
                            onClick={() => (navigate(-1))}
                            bg="none"
                            _hover={{bg: "none"}}
                            position="absolute"
                            left="5"
                        >
                            <FaChevronLeft size="29" />
                        </Button>
                        <Avatar name={friend?.username} src={friend?.avatar} size="sm" />
                        <Text fontSize="lg" fontWeight="semibold" ml="2">
                            { friend?.username }
                        </Text>
                    </Center>    
                </Skeleton>
            </Box>
        </>
    )
}