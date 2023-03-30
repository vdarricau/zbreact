import {
    Box, Button, Card, CardBody, CardHeader, Container,
    FormControl, FormErrorMessage, Heading, Checkbox,
    HStack,
    Image,
    Input,
    Stack,
    Text,
    useColorMode
} from '@chakra-ui/react';
import zbraLogo from '../assets/images/zbra_logo.png';
import zbraLogoDark from '../assets/images/zbra_logo_dark.png';
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
    const { colorMode, toggleColorMode } = useColorMode();

    let logo = zbraLogo;

    if (colorMode === 'dark') {
        logo = zbraLogoDark; 
    }

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
            <Container maxW="sm">
                <Image py="5" src={logo} w="14rem" margin="auto"/>
                
                <Card 
                    align="center" 
                    borderRadius="3xl" 
                    maxW="sm" 
                    textAlign="center"
                    m="auto"
                    background="white"
                    color="brand.900"
                    pb="3"
                    boxShadow="3px 3px 7px 0px"
                    _before={{
                        content: "''",
                        background: "brand.300",
                        width: "100px",
                        height: "100px",
                        position: "absolute",
                        borderRadius: "full",
                        left: "-35px",
                        top: "-30px",
                        zIndex: "-1",
                    }}
                    _after={{
                        content: "''",
                        background: "brand.300",
                        width: "400px",
                        height: "400px",
                        position: "absolute",
                        borderRadius: "full",
                        left: "50px",
                        top: "350px",
                        zIndex: "-1",
                    }}
                >
                    <CardHeader pb="0">
                        <Heading
                            as="h1"
                            fontWeight="bold"
                            fontSize="2xl"
                            pb="3"
                        >
                            Sign In
                        </Heading>
                        <Text fontWeight="semibold">
                            New user? &nbsp;
                            <Button
                                variant="link"
                                fontWeight="normal"
                                color="brand.100"
                                textDecoration="underline"
                                _hover={{color: "brand.500"}}
                                onClick={() => navigate('/register')}
                            >
                                Create an account
                            </Button>
                        </Text>
                    </CardHeader>
                    
                    <CardBody pb="10" px="6">
                        <form method="post" onSubmit={handleSubmit}>
                            <Stack spacing="6">
                                <Stack spacing="5">
                                    <FormControl isInvalid={error !== null}>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            defaultValue=""
                                            placeholder="Username or email"
                                            py="6"
                                            px="5"
                                        />
                                        <FormErrorMessage>
                                            {error}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <PasswordField />
                                </Stack>
                                <HStack justify="space-between" alignContent="center" alignItems="baseline">
                                    <Checkbox 
                                        defaultChecked
                                        fontWeight="semibold"
                                        fontSize="md"
                                        size='md'
                                        bg='white'
                                        border='lightBlue'
                                        colorScheme="white"
                                    >Remember me
                                    </Checkbox>
                                    <Button
                                        variant="link"
                                        color="brand.100"
                                        fontWeight="normal"
                                        textDecoration="underline"
                                        _hover={{color: "brand.500"}}
                                    >
                                        Forgot password?
                                    </Button>
                                </HStack>
                                <Stack spacing="6">
                                    <Button 
                                        variant="gradient"
                                        type="submit"
                                        isLoading={isSubmitting}
                                        colorScheme="brand"
                                    >Sign in</Button>
                                </Stack>
                            </Stack>
                        </form>
                    </CardBody>
                </Card>
            </Container>
        </>
    )
}

export default Login;