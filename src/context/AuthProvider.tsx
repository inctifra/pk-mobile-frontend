import React, {createContext, useContext, useState, useEffect} from "react";
import {useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContextType } from "@/types/Auth";
import { User } from "@/types/User";
import { loginAction } from "@/actions/auth";


const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [user, setUser] = useState<User|null>(null);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();


  useEffect(() => {
    const loadSession = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        const token = await AsyncStorage.getItem("token");
        if (userData && token) {
          setUser(JSON.parse(userData));
          setIsLoggedIn(true);
        } else {
          router.replace("/login"); // Redirect if not logged in
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error loading session", error);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);

      }
    };
    loadSession();
  }, []);

  const checkUser = async () => {
    const userData = await AsyncStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
      setIsLoggedIn(true);
    }
    setLoading(false);
    setIsLoggedIn(false);
  };

const login = async (email: string, password: string) => {
  try {
    const { user, token } = await loginAction(email, password);

    await AsyncStorage.setItem("user", JSON.stringify(user));
    await AsyncStorage.setItem("token", token);

    setUser(user);
    setIsLoggedIn(true);

    router.replace("/");
  } catch (err: any) {
    throw new Error(err.message || "Login failed.");
  }
};
  const logout = async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/login");
  };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, checkUser, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};