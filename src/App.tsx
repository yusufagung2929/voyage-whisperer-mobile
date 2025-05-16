
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./contexts/AuthContext";
import { StatusBar } from "react-native";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Trips from "./pages/Trips";
import NewTrip from "./pages/NewTrip";
import TripPlanner from "./pages/TripPlanner";
import NotFound from "./pages/NotFound";

// Create a Stack Navigator
const Stack = createStackNavigator();
const queryClient = new QueryClient();

const App = () => (
  <SafeAreaProvider>
    <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AuthProvider>
          <Stack.Navigator 
            initialRouteName="Index"
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: '#F9FAFB' }
            }}
          >
            <Stack.Screen name="Index" component={Index} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Trips" component={Trips} />
            <Stack.Screen name="NewTrip" component={NewTrip} />
            <Stack.Screen name="TripPlanner" component={TripPlanner} />
            <Stack.Screen name="NotFound" component={NotFound} />
          </Stack.Navigator>
        </AuthProvider>
      </NavigationContainer>
    </QueryClientProvider>
  </SafeAreaProvider>
);

export default App;
