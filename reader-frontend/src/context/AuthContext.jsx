import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setloading] = useState(true);
  
  async function login(username, password) {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }
    setUser(data.user);
    setAccessToken(data.accessToken);
    return data;
  }

  async function register(name, username, password) {
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        username,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || "Registration failed");
      error.errors = data.errors;
      throw error;
    }

    setUser(data.user);
    setAccessToken(data.accessToken);

    return data;
  }

  async function refreshAccessToken() {
    const response = await fetch(
      "http://localhost:3000/api/auth/refresh-token",
      {
        method: "GET",
        credentials: "include",
      },
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to refresh access token");
    }
    setAccessToken(data.accessToken);
    return data.accessToken;
  }

  useEffect(() => {
    async function restoreAuth() {
      try {
        const token = await refreshAccessToken();
        const response = await fetch("http://localhost:3000/api/auth/get-me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Unable to get user data");
        }
        setUser(data.user);
      } catch (error) {
        setUser(null);
        setAccessToken(null);
      } finally {
        setloading(false);
      }
    }
    restoreAuth();
  }, []);

  async function logout() {
    try {
      const response = await fetch("http://localhost:3000/api/auth/logout", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to logout");
      }
      setUser(null);
      setAccessToken(null);
    } catch (error) {
      console.error("Error occurred while logging out:", error);
    }
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        refreshAccessToken,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
