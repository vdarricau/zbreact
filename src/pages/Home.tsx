import { useIsAuthenticated } from "react-auth-kit";
import LandingPage from "./LandingPage";
import Zbras from "./Zbras";

const Home = () => {
    const isAuthenticated = useIsAuthenticated();
    
    if (isAuthenticated()) {
        return <Zbras />
    }
    
    return <LandingPage />;
}

export default Home;