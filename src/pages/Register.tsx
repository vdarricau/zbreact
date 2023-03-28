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
import { AxiosError } from 'axios';
import { useState } from "react";
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from "react-router-dom";
import PasswordField from '../components/PasswordField';
import useApi from '../hooks/useApi';

type ErrorRegister = {
    email?: Array<string>;
    password?: Array<string>;
    name?: Array<string>;
    username?: Array<string>;
}

const Register = () => {
    const signIn = useSignIn();
    const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);
    const [ errors, setErrors ] = useState<ErrorRegister|null>(null);
    const navigate = useNavigate();
    const { registerApi } = useApi();
    

    const handleSubmit = async (e: React.SyntheticEvent) => {
        // Prevent the browser from reloading the page
        e.preventDefault();

        setIsSubmitting(true);
        setErrors(null);

        const target = e.target as typeof e.target & {
          email: { value: string };
          name: { value: string };
          username: { value: string };
          password: { value: string };
        };
        
        try {
            const response = await registerApi(
                target.email.value,
                target.password.value,
                target.name.value,
                target.username.value,
            );

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
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response?.status === 422) {
                setErrors(error.response.data.errors);
            }

            console.error(error);
            // setErrors();
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
                            <Heading size={{ base: 'xs', md: 'sm' }}>Create your ZBRAccount</Heading>
                            <HStack spacing="1" justify="center">
                                <Text color="muted">Already have an ZBRAccount?</Text>
                                <Button variant="link" colorScheme="orange" onClick={() => navigate('/login')}> {/* @TODO for v2 */}
                                    Log in
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
                                    <FormControl isInvalid={errors?.hasOwnProperty('name')}>
                                        <FormLabel htmlFor="name">Name</FormLabel>
                                        <Input id="name" type="name" required defaultValue="Edy Hean"/>
                                        <FormErrorMessage display="block">
                                            { errors?.name?.map((error) => <Box pt={1}>{error}</Box>) }
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={errors?.hasOwnProperty('username') && errors?.username?.length !== 0}>
                                        <FormLabel htmlFor="username">Username</FormLabel>
                                        <Input id="username" type="username" required defaultValue="hyrule-hero"/>
                                        <FormErrorMessage display="block">
                                            { errors?.username?.map((error) => <Box pt={1}>{error}</Box>) }
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={errors?.hasOwnProperty('email') && errors?.email?.length !== 0}>
                                        <FormLabel htmlFor="email">Email</FormLabel>
                                        <Input id="email" type="email" required defaultValue="edy@zbra.ninja"/>
                                        <FormErrorMessage display="block">
                                            { errors?.email?.map((error) => <Box pt={1}>{error}</Box>) }
                                        </FormErrorMessage>
                                    </FormControl>
                                    <PasswordField error={errors?.password ? errors.password : []} />
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
                                    >Register</Button>
                                </Stack>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            </Container>
        </>
    )
}

export default Register;