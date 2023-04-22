import { Avatar, Box, Heading, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Stack, Text } from "@chakra-ui/react";
import { FaPaperPlane } from 'react-icons/fa';
import User from "../../@ts/User";

export default function ShareUser({ user }: {user: User}) {
    const link = "zbra.org/valou";

    return (
        <Popover onOpen={() => {
            navigator.clipboard.writeText(link);
        }}>
            <PopoverTrigger>
                <Stack 
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    borderRadius="full"
                    bg="white"
                    color="brand.900"
                    px="2"
                    mb="4"
                    border="1px solid"
                    borderColor="brand.900"
                >
                    <Avatar name={user.username} src={user.avatar} size="sm" />

                    <Box px="1" pt="2" pb="1" flex="auto">
                        <Heading size="sm">
                            Invite your zbros
                        </Heading>
                        <Text fontSize="xs">
                            { link }
                        </Text>
                    </Box>

                    <Box pr="3">
                        <FaPaperPlane size="18" color="brand.900"/>
                    </Box>
                </Stack>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                    <Text fontSize="sm">Copied to clipboard</Text>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}