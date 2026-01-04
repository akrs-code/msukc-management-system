import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(null); 
    const { dispatch } = useAuthContext();

    const signup = async (name, email, password) => {
        setError(null);
        setSuccess(null);
        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            let json = {};
            try {
                json = await response.json();
            } catch {
                json = { error: "Invalid server response" };
            }

            if (!response.ok) {
                setError(json.message || "Failed to sign up");
            } else {
                setSuccess(json.message || "Signup successful!");

                // Save user if returned
                if (json.user) {
                    localStorage.setItem("user", JSON.stringify(json.user));
                    dispatch({ type: "LOGIN", payload: json.user });
                }
            }
        } catch (err) {
            setError(err.message || "Network error");
        } finally {
            setIsLoading(false);
        }
    };

    return { signup, isLoading, error, success }; 
};
