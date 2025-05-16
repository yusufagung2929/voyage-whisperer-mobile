
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Alert } from "react-native";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children, navigation }: { children: ReactNode, navigation?: any }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Check for existing session on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // In mobile, we'd use AsyncStorage
        // For this example, we'll simulate the check
        setUser(null);
      } catch (error) {
        console.error("Authentication check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, you would connect to your backend
      // const response = await fetch("http://your-backend-url/api/auth/login", {...})
      
      // For demo purposes, we'll simulate a successful login
      const mockResponse = {
        user: { id: "user123", name: "Demo User", email },
        token: "mock-jwt-token"
      };
      
      // In mobile, we'd use AsyncStorage instead of localStorage
      // For demo, we just set the state
      setUser(mockResponse.user);
      Alert.alert("Success", "Login successful");
    } catch (error) {
      console.error("Login failed:", error);
      Alert.alert("Error", "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, you would connect to your backend
      // const response = await fetch("http://your-backend-url/api/auth/register", {...})
      
      // For demo purposes, we'll simulate a successful registration
      const mockResponse = {
        user: { id: "newuser123", name, email },
        token: "mock-jwt-token"
      };
      
      // In mobile, we'd use AsyncStorage instead of localStorage
      // For demo, we just set the state
      setUser(mockResponse.user);
      Alert.alert("Success", "Registration successful");
    } catch (error) {
      console.error("Registration failed:", error);
      Alert.alert("Error", "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // In mobile, we'd use AsyncStorage.removeItem
    // For demo, we just set the state
    setUser(null);
    Alert.alert("Success", "Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
