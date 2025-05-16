
import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NotFound = ({ navigation, route }) => {
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", route.name);
  }, [route.name]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>!</Text>
        </View>
        <Text style={styles.title}>404</Text>
        <Text style={styles.subtitle}>Oops! Page not found</Text>
        <Text style={styles.description}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Index")}
        >
          <Text style={styles.buttonText}>Return to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  },
  content: {
    maxWidth: 400,
    width: "100%",
    alignItems: "center"
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24
  },
  icon: {
    fontSize: 48,
    color: "#3B82F6",
    fontWeight: "bold"
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1F2937"
  },
  subtitle: {
    fontSize: 20,
    color: "#6B7280",
    marginBottom: 24
  },
  description: {
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
    fontSize: 16
  },
  button: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8
  },
  buttonText: {
    color: "white",
    fontWeight: "bold"
  }
});

export default NotFound;
