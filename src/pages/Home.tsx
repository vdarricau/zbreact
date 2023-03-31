import { useIsAuthenticated } from "react-auth-kit";
import LandingPage from "./LandingPage";
import ZbrasV2 from "./ZbrasV2";

const Home = () => {
    const isAuthenticated = useIsAuthenticated();
    
    if (isAuthenticated()) {
        return <ZbrasV2 />
    }
    
    return <LandingPage />;
}

export default Home;