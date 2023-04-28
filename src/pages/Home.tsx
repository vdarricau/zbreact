import { useIsAuthenticated } from "react-auth-kit";
import Feed from "./Feed";
import LandingPage from "./LandingPage";

const Home = () => {
    const isAuthenticated = useIsAuthenticated();

    if (isAuthenticated()) {
        return <Feed />;
    }

    return <LandingPage />;
};

export default Home;
