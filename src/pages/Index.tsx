
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/contexts/AuthContext";

const Index = ({ navigation }) => {
  const { user } = useAuth();

  useEffect(() => {
    // If user is already logged in, redirect to trips
    if (user) {
      navigation.navigate("Trips");
    }
  }, [user, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Hero section */}
      <View style={styles.heroSection}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>TP</Text>
        </View>
        <Text style={styles.title}>TripPlanner AI</Text>
        <Text style={styles.subtitle}>
          Create personalized trip itineraries with AI assistance
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Features section */}
      <View style={styles.featuresSection}>
        <Text style={styles.featuresTitle}>
          Plan Your Perfect Trip with AI
        </Text>
        <View style={styles.featuresGrid}>
          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Text style={styles.featureIcon}>⏱️</Text>
            </View>
            <Text style={styles.featureTitle}>Time-Saving Planning</Text>
            <Text style={styles.featureDescription}>
              Generate complete itineraries in seconds with our AI assistant
            </Text>
          </View>
          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Text style={styles.featureIcon}>📋</Text>
            </View>
            <Text style={styles.featureTitle}>Step-by-Step Timeline</Text>
            <Text style={styles.featureDescription}>
              Visualize your trip planning process with our intuitive timeline interface
            </Text>
          </View>
          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Text style={styles.featureIcon}>💡</Text>
            </View>
            <Text style={styles.featureTitle}>Smart Suggestions</Text>
            <Text style={styles.featureDescription}>
              Receive real-time recommendations based on your preferences and budget
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB"
  },
  heroSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24
  },
  logoText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold"
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1F2937"
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 32,
    color: "#4B5563",
    textAlign: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16
  },
  loginButton: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8
  },
  loginButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16
  },
  registerButton: {
    borderColor: "#3B82F6",
    borderWidth: 1,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8
  },
  registerButtonText: {
    color: "#3B82F6",
    fontWeight: "600",
    fontSize: 16
  },
  featuresSection: {
    padding: 24,
    backgroundColor: "#F1F5F9"
  },
  featuresTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#1F2937"
  },
  featuresGrid: {
    gap: 16
  },
  featureCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderColor: "#E5E7EB",
    borderWidth: 1
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16
  },
  featureIcon: {
    fontSize: 24
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#1F2937"
  },
  featureDescription: {
    fontSize: 14,
    color: "#4B5563"
  }
});

export default Index;
