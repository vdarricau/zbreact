import {
    Box, Button, chakra, Container,
    Stack, Text, useColorModeValue, VisuallyHidden
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const SocialButton = ({ children, label, href}: { children: ReactNode; label: string; href: string;}) => {
    return (
        <Button
            borderRadius="100%"
            as={'a'}
            href={href}
            fontSize="18px"
            px="4"
            py="6"
        >
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </Button>
    );
};
    
const FooterComponent = () => {
    return (
        <>
            <Box
                borderTopWidth={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                >
                <Container
                    as={Stack}
                    py={4}
                    direction={{ base: 'column', md: 'row' }}
                    spacing={4}
                    justify={{ md: 'space-between' }}
                    align='center'
                >
                <Text>© 2023 Zbra Inc. All rights reserved</Text>
                <Stack direction={'row'} spacing={6}>
                    <SocialButton label={'Twitter'} href={'#'}>
                        <FaTwitter />
                    </SocialButton>
                    <SocialButton label={'YouTube'} href={'#'}>
                        <FaYoutube />
                    </SocialButton>
                    <SocialButton label={'Instagram'} href={'#'}>
                        <FaInstagram />
                    </SocialButton>
                </Stack>
                </Container>
            </Box>
        </>
    )
}
    
export default FooterComponent;