
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  
  // Check for existing session on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        
        if (storedUser && token) {
          setUser(JSON.parse(storedUser));
        }
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
      
      localStorage.setItem("token", mockResponse.token);
      localStorage.setItem("user", JSON.stringify(mockResponse.user));
      setUser(mockResponse.user);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      navigate("/trips");
    } catch (error) {
      console.error("Login failed:", error);
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
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
      
      localStorage.setItem("token", mockResponse.token);
      localStorage.setItem("user", JSON.stringify(mockResponse.user));
      setUser(mockResponse.user);
      toast({
        title: "Registration Successful",
        description: "Your account has been created!",
      });
      navigate("/trips");
    } catch (error) {
      console.error("Registration failed:", error);
      toast({
        title: "Registration Failed",
        description: "Please check your information and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
    toast({
      title: "Logged Out",
      description: "You've been successfully logged out.",
    });
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
