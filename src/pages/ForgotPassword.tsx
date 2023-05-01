import {
    Box,
    Button,
    CardBody,
    CardFooter,
    CardHeader,
    FormControl,
    FormErrorMessage,
    Heading,
    Input,
    Stack,
    Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/Auth/AuthCard";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

    const handleSubmit = async (e: any) => {
        setIsSubmitting(true);
        e.preventDefault();

        // @TODO
        setTimeout(() => {
            console.error("This has not been implemented yet");
            setIsSubmitting(false);
            setHasSubmitted(true);
        }, 2000);
    };

    if (hasSubmitted) {
        return (
            <AuthCard>
                <CardHeader pb="0">
                    <Heading as="h1" fontWeight="bold" fontSize="2xl" pb="3">
                        Reset password email sent
                    </Heading>
                </CardHeader>
                <CardBody>
                    You should soon receive an email allowing you to reset your
                    password. Please make sure to check your spam and trash if
                    you can't find the email.
                </CardBody>
            </AuthCard>
        );
    }

    return (
        <AuthCard>
            <CardHeader pb="0">
                <Heading as="h1" fontWeight="bold" fontSize="2xl" pb="3">
                    Forgot Password
                </Heading>
            </CardHeader>

            <CardBody px="6">
                <form method="POST" onSubmit={handleSubmit}>
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
                    <Stack mt="4" mb="6">
                        <Button
                            mt="5"
                            variant="gradient"
                            type="submit"
                            isLoading={isSubmitting}
                        >
                            Reset Password
                        </Button>
                        <Text fontWeight="semibold">
                            Or &nbsp;
                            <Button
                                variant="link"
                                fontWeight="normal"
                                color="brand.100"
                                textDecoration="underline"
                                _hover={{ color: "brand.500" }}
                                onClick={() => navigate("/login")}
                            >
                                Log in
                            </Button>
                        </Text>
                    </Stack>
                </form>
            </CardBody>
        </AuthCard>
    );
}
