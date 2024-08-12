import { createContext, useContext, useEffect, useState } from "react";

// Create the AuthContext with a default value (optional)
export const AuthContext = createContext(null);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const tokenKey = "token";
  const [token, setToken] = useState(localStorage.getItem(tokenKey));
  const [user, setUser] = useState();

  const setTokenInLC = (tokenVal) => {
    localStorage.setItem(tokenKey, tokenVal);
    setToken(tokenVal); // Update the state as well
  };

  let isLoggedIn = !!token;

  const LogoutUser = () => {
    setToken(null);
    return localStorage.removeItem(tokenKey);
  };

  const userAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json(response);
        setUser(data.userData);
      }
    } catch (error) {
      console.log("Authentication error", error);
    }
  };

  useEffect(() => {
    userAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{ setTokenInLC, LogoutUser, isLoggedIn, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
};
