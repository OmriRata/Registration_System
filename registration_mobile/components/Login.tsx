  import React, { useState } from "react";
  import { useFocusEffect } from 'expo-router';
  import { useCallback } from 'react';
  import { useNavigation } from '@react-navigation/native';
  import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    StyleSheet,
  } from "react-native";

  export const unstable_settings = {
    tabBarHidden: true,
  };

  export default function App() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    


    const login = async () => {
      if (!email || !password) {
        Alert.alert("Error", "Please enter both email and password.");
        return;
      }
      try {
        const response = await fetch("http://192.168.1.173:8000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await response.json();
        
        if (response.ok) {
          Alert.alert("Success", `Welcome, ${data.username || "User"}!`);
          // Navigate to another screen if login is successful
          // navigation.navigate("Home");
        } else {
          Alert.alert("Login Failed", data.message || "Invalid credentials");
        }
      } catch (error) {
        Alert.alert("Error", "Something went wrong. Please try again.");
        console.error("Login error:", error);
      }
    }; 

    return (
      <View style={styles.container}>

        <View style={styles.rightSection}>
          <View style={styles.topLogo}>
              <Image source={require("../assets/images/Logo_mobile.png")}></Image>
          </View>
          <Text style={styles.heading}>Log in</Text>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Image source={require("../assets/images/Email.png")} style={styles.icon} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              style={styles.input}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Image source={require("../assets/images/Password.png")} style={styles.icon} />
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholder="Password"
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image source={require("../assets/images/Group.png")} style={styles.icon} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={login}>
            <Text style={styles.loginText}>Log in</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.orText}>Or</Text>
            <View style={styles.divider} />
          </View>

          {/* Social Login */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Image source={require("../assets/images/Google.png")} style={styles.socialIcon} />
              <Text> Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image source={require("../assets/images/Facebook.png")} style={styles.socialIcon} />
              <Text> Facebook</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <Text style={styles.registerText}>Have no account yet?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
      topLogo:{paddingTop:'30%',paddingBottom:'10%'},
      container: {flex: 1, backgroundColor: "#5769d4" },
      leftSection: { flex: 1, backgroundColor: "#3949ab", justifyContent: "center", alignItems: "center", padding: 20 },
      logo: { width: 150, resizeMode: "contain", marginBottom: 20 },
      illustration: { width: 200, height: 200, resizeMode: "contain", marginBottom: 20 },
      welcomeText: { color: "white", fontSize: 20, fontWeight: "bold" },
      subtitle: { color: "white", fontSize: 14, textAlign: "center", marginTop: 5 },
      rightSection: { flex: 1, padding: 20, backgroundColor: "white", justifyContent: "center", alignItems: "center" },
      heading: { fontSize: 24, fontWeight: "bold", color: "#3949ab", marginBottom: '20%' },
      inputContainer: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: 10, padding: 10, width: "80%", marginBottom: 10 },
      icon: { width: 20, height: 20, marginRight: 10 },
      input: { flex: 1, fontSize: 16 },
      forgotPassword: { color: "blue", alignSelf: "flex-end", marginBottom: 20 },
      loginButton: { backgroundColor: "#9ca4d5", padding: 12, borderRadius: 25, alignItems: "center", width: "80%" },
      loginText: { color: "white", fontSize: 16, fontWeight: "bold" },
      dividerContainer: { flexDirection: "row", alignItems: "center", width: "80%", marginVertical: 20 },
      divider: { flex: 1, height: 1, backgroundColor: "#ccc" },
      orText: { marginHorizontal: 10, color: "#666" },
      socialContainer: { flexDirection: "row", justifyContent: "space-between", width: "80%" },
      socialButton: { flexDirection: "row", alignItems: "center", borderWidth: 1, padding: 10, borderRadius: 10, flex: 1, justifyContent: "center", marginHorizontal: 5 },
      socialIcon: { width: 20, height: 20, marginRight: 5 },
      registerText: { color: "#3949ab", marginTop: 10 },
      registerButton: { borderWidth: 1, padding: 12, borderRadius: 10, width: "80%", alignItems: "center", marginTop: 10 },
  });

