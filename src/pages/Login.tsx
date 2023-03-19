import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    Text
} from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../hooks/useAuth";
import { User } from "../hooks/useUser";
import { Logo } from '../components/Logo';
import { PasswordField } from '../components/PasswordField';

const Login = () => {
    const { isAuthenticated, login } = useAuth();
    const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);
    const [ error, setError ] = useState<string|null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            return navigate('/');
        }
    }, []);
    

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
            const response = await api.post('/login', {
                email: target.email.value,
                password: target.password.value
            });

            const user = response.data.user as typeof response.data.user & User;
            user.authToken = response.data.token;

            login(user);
            navigate('/');
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
                        <Logo />
                        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                            <Heading size={{ base: 'xs', md: 'sm' }}>Log in to your account</Heading>
                            <HStack spacing="1" justify="center">
                                <Text color="muted">Don't have an account?</Text>
                                <Button variant="link" colorScheme="blue"> {/* @TODO for v2 */}
                                    Sign up
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
                                        <Input id="email" type="email" required />
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