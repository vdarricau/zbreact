import {
    Box,
    Button,
    CardBody,
    CardHeader,
    FormControl,
    FormErrorMessage,
    Heading,
    Input,
    Stack,
    Text,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useState } from "react";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/Auth/AuthCard";
import PasswordField from "../components/Auth/PasswordField";
import useApi from "../hooks/useApi";

type ErrorRegister = {
    email?: Array<string>;
    password?: Array<string>;
    name?: Array<string>;
    username?: Array<string>;
};

const Register = () => {
    const signIn = useSignIn();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [errors, setErrors] = useState<ErrorRegister | null>(null);
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
                target.username.value
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
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response?.status === 422) {
                setErrors(error.response.data.errors);
            }

            console.error(error);
            // setErrors();
            setIsSubmitting(false);
        }
    };

    return (
        <AuthCard>
            <CardHeader pb="0">
                <Heading as="h1" fontWeight="bold" fontSize="2xl" pb="3">
                    Register
                </Heading>
                <Text fontWeight="semibold">
                    Account created? &nbsp;
                    <Button
                        variant="link"
                        fontWeight="normal"
                        color="brand.100"
                        textDecoration="underline"
                        _hover={{ color: "brand.500" }}
                        onClick={() => navigate("/login")}
                    >
                        Sign In
                    </Button>
                </Text>
            </CardHeader>

            <CardBody pb="10" px="6">
                <form method="POST" onSubmit={handleSubmit}>
                    <Stack spacing="6">
                        <Stack spacing="5">
                            <FormControl
                                isInvalid={errors?.hasOwnProperty("name")}
                            >
                                <Input
                                    id="name"
                                    type="name"
                                    placeholder="Name"
                                    required
                                />
                                <FormErrorMessage display="block">
                                    {errors?.name?.map((error) => (
                                        <Box pt={1}>{error}</Box>
                                    ))}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isInvalid={
                                    errors?.hasOwnProperty("username") &&
                                    errors?.username?.length !== 0
                                }
                            >
                                <Input
                                    id="username"
                                    type="username"
                                    placeholder="Username"
                                    required
                                />
                                <FormErrorMessage display="block">
                                    {errors?.username?.map((error) => (
                                        <Box pt={1}>{error}</Box>
                                    ))}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isInvalid={
                                    errors?.hasOwnProperty("email") &&
                                    errors?.email?.length !== 0
                                }
                            >
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    required
                                />
                                <FormErrorMessage display="block">
                                    {errors?.email?.map((error) => (
                                        <Box pt={1}>{error}</Box>
                                    ))}
                                </FormErrorMessage>
                            </FormControl>
                            <PasswordField
                                error={errors?.password ? errors.password : []}
                            />
                            {/* @TODO add password confirmation */}
                        </Stack>
                        <Stack spacing="6">
                            <Button
                                variant="gradient"
                                type="submit"
                                isLoading={isSubmitting}
                            >
                                Register
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </CardBody>
        </AuthCard>
    );
};

export default Register;
