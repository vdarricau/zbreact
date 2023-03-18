import { useState, FormEvent } from "react";
import api from "../api/api";

const Login = () => {
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

        const user = response.data.user as typeof response.data.user & {
            email: string,
            id: string,
            name: string,
        };
        const token = response.data.token;
    
        console.log(response);
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