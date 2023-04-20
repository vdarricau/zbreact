import { useIsAuthenticated } from "react-auth-kit";
import LandingPage from "./LandingPage";
import Feed from "./Feed";

const Home = () => {
    const isAuthenticated = useIsAuthenticated();
    
    if (isAuthenticated()) {
        return <Feed />
    }
    
    return <LandingPage />;
}

export default Home;