import { createContext, useContext, useState } from "react";

// Create the AuthContext with a default value (optional)
export const AuthContext = createContext(null);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const tokenKey = "token";
  const [token, setToken] = useState(localStorage.getItem(tokenKey));

  const setTokenInLC = (tokenVal) => {
    localStorage.setItem(tokenKey, tokenVal);
    setToken(tokenVal); // Update the state as well
  };

  let isLoggedIn = !!token;

  const LogoutUser = () => {
    setToken(null);
    return localStorage.removeItem(tokenKey);
  };

  return (
    <AuthContext.Provider value={{ setTokenInLC, LogoutUser, isLoggedIn }}>
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
