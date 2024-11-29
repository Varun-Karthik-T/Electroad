import React, { useState, useEffect } from "react";
import { TextInput, Button, PaperProvider } from "react-native-paper";
import { AppRegistry, View, StyleSheet } from "react-native";
import { name as appName } from "../app.json";
import { router } from "expo-router";
import { login } from "@/Components/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { schedulePushNotification } from "@/Components/notify";


const theme = {
  colors: {
    primary: "rgb(0, 110, 11)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(138, 252, 122)",
    onPrimaryContainer: "rgb(0, 34, 1)",
    secondary: "rgb(38, 108, 43)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(170, 245, 164)",
    onSecondaryContainer: "rgb(0, 34, 4)",
    tertiary: "rgb(4, 110, 22)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(47, 49, 45)",
    inverseOnSurface: "rgb(241, 241, 235)",
    inversePrimary: "rgb(110, 222, 97)",
    elevation: {
      level0: "transparent",
      level1: "rgb(239, 246, 234)",
      level2: "rgb(232, 242, 227)",
      level3: "rgb(224, 237, 220)",
      level4: "rgb(222, 236, 218)",
      level5: "rgb(217, 233, 213)",
    },
    surfaceDisabled: "rgba(26, 28, 25, 0.12)",
    onSurfaceDisabled: "rgba(26, 28, 25, 0.38)",
    backdrop: "rgba(44, 50, 42, 0.4)",
  },
};

export default function IndexPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    const getStoredCredentials = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("email");
        const storedPassword = await AsyncStorage.getItem("password");
        if (storedEmail && storedPassword) {
          setEmail(storedEmail);
          setPassword(storedPassword);
         // router.push("/home");
        }
      } catch (error) {
        console.log("Failed to load credentials", error);
      }
    };
    getStoredCredentials();
  }, []);

  const handleLogin = async () => {
    console.log("Email:", email);
    console.log("Password:", password);

    if (email && password) {
      try {
        setLoading(true);
        const response = await login({ email, password });
        console.log("Response data:", response.data);

        if (response.status === 200) {
          await AsyncStorage.setItem("email", email);
          await AsyncStorage.setItem("password", password);
          schedulePushNotification("Login Success", "You have successfully logged in.");
          router.push("/home");
        } else {
          alert("Invalid email or password");
        }
      } catch (error) {
        alert("Login failed. Please try again.");
      } finally {

        setLoading(false);
      }
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
          loading={loading}
          disabled={loading}
        >
          Login
        </Button>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
  },
  input: {
    padding: 3,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
  },
  button: {
    marginTop: 16,
  },
});

AppRegistry.registerComponent(appName, () => IndexPage);
