import {
    Button,
    CardBody,
    CardHeader,
    Checkbox,
    FormControl,
    FormErrorMessage,
    Heading,
    HStack,
    Input,
    Stack,
    Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/Auth/AuthCard";
import PasswordField from "../components/Auth/PasswordField";
import useApi from "../hooks/useApi";

const Login = () => {
    const signIn = useSignIn();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
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
            const response = await loginApi(
                target.email.value,
                target.password.value
            );

            if (
                signIn({
                    token: response.data.token,
                    expiresIn: 3600,
                    tokenType: "Bearer",
                    authState: response.data.user,
                })
            ) {
                navigate("/");
            } else {
                //Throw error
            }
        } catch (error) {
            setError("Wrong password ZBRUH");
            setIsSubmitting(false);
        }
    };

    return (
        <AuthCard>
            <CardHeader pb="0">
                <Heading as="h1" fontWeight="bold" fontSize="2xl" pb="3">
                    Sign In
                </Heading>
                <Text fontWeight="semibold">
                    New user? &nbsp;
                    <Button
                        variant="link"
                        fontWeight="normal"
                        color="brand.100"
                        textDecoration="underline"
                        _hover={{ color: "brand.500" }}
                        onClick={() => navigate("/register")}
                    >
                        Create an account
                    </Button>
                </Text>
            </CardHeader>

            <CardBody pb="10" px="6">
                <form method="POST" onSubmit={handleSubmit}>
                    <Stack spacing="6">
                        <Stack spacing="5">
                            <FormControl isInvalid={error !== null}>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    defaultValue=""
                                    placeholder="Email"
                                    py="6"
                                    px="5"
                                />
                                <FormErrorMessage>{error}</FormErrorMessage>
                            </FormControl>
                            <PasswordField />
                        </Stack>
                        <HStack
                            justify="space-between"
                            alignContent="center"
                            alignItems="baseline"
                        >
                            <Checkbox
                                defaultChecked
                                fontWeight="semibold"
                                fontSize="md"
                                size="md"
                                bg="white"
                                color="brand.900"
                                colorScheme="brand"
                            >
                                Remember me
                            </Checkbox>
                            <Button
                                variant="link"
                                color="brand.100"
                                fontWeight="normal"
                                textDecoration="underline"
                                _hover={{ color: "brand.500" }}
                                onClick={() => navigate("/forgot-password")}
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
                            >
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </CardBody>
        </AuthCard>
    );
};

export default Login;
