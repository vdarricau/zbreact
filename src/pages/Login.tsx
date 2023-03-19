import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../hooks/useAuth";
import { User } from "../hooks/useUser";

const Login = () => {
    const { isAuthenticated, login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            return navigate('/');
        }
    }, []);
    

    const handleSubmit = async (e: React.SyntheticEvent) => {
        // Prevent the browser from reloading the page
        e.preventDefault();

        const target = e.target as typeof e.target & {
          email: { value: string };
          password: { value: string };
        };
        
        // @TODO try/catch
        const response = await api.post('/login', {
            email: target.email.value,
            password: target.password.value
        });

        const user = response.data.user as typeof response.data.user & User;

        user.authToken = response.data.token;

        login(user);

        navigate('/');
      }

    return (
        <>
            <div className="form">
                <form method="post" onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label>Email </label>
                        <input type="text" name="email" required />
                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input type="password" name="password" required />
                    </div>
                    <div className="button-container">
                        <input type="submit" />
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;