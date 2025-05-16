
import { ReactNode, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/contexts/AuthContext";
import { View, ActivityIndicator } from "react-native";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (!isLoading && !user) {
      navigation.navigate("Login" as never);
    }
  }, [user, isLoading, navigation]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return user ? <>{children}</> : null;
};

export default ProtectedRoute;
