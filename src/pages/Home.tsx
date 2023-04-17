import { useIsAuthenticated } from "react-auth-kit";
import LandingPage from "./LandingPage";
import ZbrasV2 from "./Zbras";

const Home = () => {
    const isAuthenticated = useIsAuthenticated();
    
    if (isAuthenticated()) {
        return <ZbrasV2 />
    }
    
    return <LandingPage />;
}

export default Home;