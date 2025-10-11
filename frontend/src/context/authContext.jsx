// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Always sync user state with localStorage on mount and when localStorage changes
  useEffect(() => {
    const syncUser = () => {
      const auth = JSON.parse(localStorage.getItem("auth"));
      if (auth?.expiresAt && auth.expiresAt > Date.now() && auth.user) {
        setUser(auth.user);
      } else {
        setUser(null);
        localStorage.removeItem("auth");
      }
    };
    syncUser();
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("auth");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
