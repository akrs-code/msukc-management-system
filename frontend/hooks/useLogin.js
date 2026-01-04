import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.message || "Failed to login");
        setIsLoading(false);
        return null;
      } else {
        // Save user to localStorage
        localStorage.setItem("user", JSON.stringify(json));

        // Dispatch login action
        dispatch({ type: "LOGIN", payload: json });

        setIsLoading(false);
        return json;
      }
    } catch (err) {
      setIsLoading(false);
      setError("Something went wrong. Please try again.");
    }
  };

  return { login, isLoading, error };
};
