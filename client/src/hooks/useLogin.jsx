import { useState } from "react";
import { useAuth } from "../context/AuthProvider";

export default function useLogin(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { setIsAuthenticated, setToken } = useAuth();
  const login = async (object) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(object),
    });
    const user = await response.json();
    if (!response.ok) {
      setError(user.error);
      setIsLoading(false);
      return error;
    }
    setToken(user.token);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(user));
    setIsLoading(false);
  };

  return { login, isLoading, error };
}
