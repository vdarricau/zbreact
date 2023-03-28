import {
    Box, Button, Container,
    FormControl, FormErrorMessage, FormLabel,
    Heading,
    HStack,
    Image,
    Input,
    Stack,
    Text
} from '@chakra-ui/react';
import { useState } from "react";
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from "react-router-dom";
import PasswordField from '../components/PasswordField';
import useApi from '../hooks/useApi';

const Login = () => {
    const signIn = useSignIn();
    const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);
    const [ error, setError ] = useState<string|null>(null);
    const navigate = useNavigate();
    const { loginApi } = useApi();
    

    const handleSubmit = async (e: React.SyntheticEvent) => {
        // Prevent the browser from reloading the page
        e.preventDefault();

        setIsSubmitting(true);
        setError(null);

        const target = e.target as typeof e.target & {
          email: { value: string };
          password: { value: string };
        };
        
        try {
            const response = await loginApi(target.email.value, target.password.value);

            if(signIn({
                token: response.data.token,
                expiresIn: 3600,
                tokenType: "Bearer",
                authState: response.data.user,
            })) {
                navigate('/');
            } else {
                //Throw error
            }
        } catch (error) {
            setError("Hey Zbro, it seems that you f*cked up your creds. Try your dog's name.");
            setIsSubmitting(false);
        }
      }

    return (
        <>
            <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
                <Stack spacing="8">
                    <Stack spacing="6">
                        <Image src='/favicon.png' w="150px" margin="auto"/>
                        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                            <Heading size={{ base: 'xs', md: 'sm' }}>Log in to your ZBRAccount</Heading>
                            <HStack spacing="1" justify="center">
                                <Text color="muted">Don't have an ZBRAcount?</Text>
                                <Button variant="link" colorScheme="orange" onClick={() => navigate('/register')}>
                                    Register
                                </Button>
                            </HStack>
                        </Stack>
                    </Stack>
                    <Box
                        py={{ base: '0', sm: '8' }}
                        px={{ base: '4', sm: '10' }}
                        bg={{ base: 'transparent', sm: 'bg-surface' }}
                        boxShadow={{ base: 'none', sm: 'md' }}
                        borderRadius={{ base: 'none', sm: 'xl' }}
                    >
                        <form method="post" onSubmit={handleSubmit}>
                            <Stack spacing="6">
                                <Stack spacing="5">
                                    <FormControl isInvalid={error !== null}>
                                        <FormLabel htmlFor="email">Email</FormLabel>
                                        <Input id="email" type="email" required defaultValue="val@zbra.ninja"/>
                                        <FormErrorMessage>
                                            {error}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <PasswordField />
                                </Stack>
                                {/* <HStack justify="space-between">
                                    <Checkbox defaultChecked>Remember me</Checkbox>
                                    <Button variant="link" colorScheme="blue" size="sm">
                                    Forgot password?
                                    </Button>
                                </HStack> */}
                                <Stack spacing="6">
                                    <Button 
                                        variant="solid"
                                        type="submit"
                                        isLoading={isSubmitting}
                                    >Sign in</Button>
                                </Stack>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            </Container>
        </>
    )
}

export default Login;