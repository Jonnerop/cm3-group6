import { useState } from "react";
import { useAuth } from "../context/AuthProvider";

export default function useSignup(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { setIsAuthenticated, setToken } = useAuth();

  const signup = async (object) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: "POST",
        body: object,
      });

      const user = await response.json();
      if (!response.ok) {
        setError(user.error || "Failed to sign up");
        setIsLoading(false);
        return null;
      }

      setToken(user.token);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(user));
      setIsLoading(false);
      return user;
    } catch (err) {
      setError(err.message || "Failed to sign up");
      setIsLoading(false);
      return null;
    }
  };

  return { signup, isLoading, error };
}
