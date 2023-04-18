import { Box, Center, Container } from "@chakra-ui/react";
import Logo from "./Logo";

export default function Loading() {
    return (
        <>
            <Box h="100%">
                <Box
                    w="14rem"
                    h="9.33rem"
                    className="x"
                >
                    <Logo 
                        w="14rem"
                        h="9.33rem"
                        className="y"
                    />
                </Box>
            </Box>
        </>
    )
}