import { createContext, useContext, useEffect, useState } from "react";

// Create the AuthContext with a default value (optional)
export const AuthContext = createContext(null);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const tokenKey = "token";
  const [token, setToken] = useState(localStorage.getItem(tokenKey));
  const [user, setUser] = useState("");
  const [services, setServices] = useState("");
  const authorizationToken = `Bearer ${token}`;

  const API = import.meta.env.VITE_APP_SERVER_API_URI;

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
      const response = await fetch(`${API}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
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

  const getServices = async () => {
    const servicesRes = await fetch(`${API}/api/serivces`, {
      method: "GET",
    });

    if (servicesRes.ok) {
      const data = await servicesRes.json();
      setServices(data);
    }
  };

  useEffect(() => {
    userAuthentication();
    getServices();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        setTokenInLC,
        LogoutUser,
        isLoggedIn,
        user,
        services,
        authorizationToken,
        API,
      }}
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
