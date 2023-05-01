import { Box } from "@chakra-ui/react";
import Routing from "./Routing";
import NavComponent from "./components/Nav/NavComponent";

// import FooterComponent from './components/FooterComponent';

export default function App() {
    return (
        <Box h="100vh" display="grid" gridTemplateRows="auto 1fr">
            <NavComponent />
            <Box className="App" overflowY="auto" h="100%">
                <Routing />
            </Box>
            {/* <FooterComponent /> */}
        </Box>
    );
}
