import { Card, Container } from "@chakra-ui/react";
import Logo from "../Logo";

export default function AuthCard({
    children,
}: {
    children?: React.ReactNode | React.ReactNode[] | undefined;
}) {
    return (
        <Container maxW="sm" height="100%" overflow="hidden">
            <Logo py="5" w="14rem" h="11.83rem" margin="auto" />

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
                {children}
            </Card>
        </Container>
    );
}
