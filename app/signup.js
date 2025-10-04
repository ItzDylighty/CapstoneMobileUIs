import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../supabase/supabaseClient";

const SignupScreen = () => {
  const navigation = useNavigation();

  const [focusedInput, setFocusedInput] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const commonInputContainerStyle = {
    borderBottomWidth: 0,
    height: 30,
  };

  const handleSignup = async () => {
    if (!email || !password || !confirm) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (password !== confirm) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert("Signup error", error.message);
    } else {
      Alert.alert(
        "Success",
        "Account created! Please check your email to confirm your account."
      );
      navigation.goBack();
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) throw error;
    } catch (error) {
      Alert.alert("Google Login Error", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" type="ionicon" color="#000" size={28} />
      </TouchableOpacity>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={60}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={require("../assets/Museo_Logo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Create an account</Text>
          <Text style={styles.subtitle}>
            Enter your details to create a new account
          </Text>

          {/* Email */}
          <View style={styles.inputWrapper}>
            {!email && <Text style={styles.placeholderText}>Email</Text>}
            <Input
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              containerStyle={[
                styles.inputContainer,
                focusedInput === "email" && styles.focusedContainer,
              ]}
              inputContainerStyle={commonInputContainerStyle}
              inputStyle={styles.inputStyle}
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          {/* Password */}
          <View style={styles.inputWrapper}>
            {!password && <Text style={styles.placeholderText}>Password</Text>}
            <Input
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              rightIcon={
                <Icon
                  name={showPassword ? "eye" : "eye-off"}
                  type="ionicon"
                  onPress={() => setShowPassword(!showPassword)}
                  color="#000"
                  size={22}
                  containerStyle={{ marginTop: 20 }}
                />
              }
              containerStyle={[
                styles.inputContainer,
                focusedInput === "password" && styles.focusedContainer,
              ]}
              inputContainerStyle={commonInputContainerStyle}
              inputStyle={styles.inputStyle}
              onFocus={() => setFocusedInput("password")}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          {/* Confirm Password */}
          <View style={styles.inputWrapper}>
            {!confirm && (
              <Text style={styles.placeholderText}>Confirm Password</Text>
            )}
            <Input
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry={!showConfirm}
              rightIcon={
                <Icon
                  name={showConfirm ? "eye" : "eye-off"}
                  type="ionicon"
                  onPress={() => setShowConfirm(!showConfirm)}
                  color="#000"
                  size={22}
                  containerStyle={{ marginTop: 20 }}
                />
              }
              containerStyle={[
                styles.inputContainer,
                focusedInput === "confirm" && styles.focusedContainer,
              ]}
              inputContainerStyle={commonInputContainerStyle}
              inputStyle={styles.inputStyle}
              onFocus={() => setFocusedInput("confirm")}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          {/* Create Button */}
          <Button
            title="Create Account"
            onPress={handleSignup}
            buttonStyle={styles.createButton}
            titleStyle={styles.createButtonTitle}
            containerStyle={styles.createButtonContainer}
          />

          {/* OR Divider */}
          <View style={styles.orContainer}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.orLine} />
          </View>

          {/* Google Login Button */}
          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
            <Image
              source={require("../assets/googlelogo.jpg")}
              style={styles.googleLogo}
            />
            <Text style={styles.googleText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Already have an account? */}
          <View style={styles.signinContainer}>
            <Text style={styles.signinText}>
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.signinLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 30,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: "contain",
    marginTop: 50,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginBottom: 30,
  },
  inputWrapper: {
    width: "100%",
    position: "relative",
  },
  placeholderText: {
    position: "absolute",
    top: 17,
    left: 15,
    color: "#888",
    zIndex: 1,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 5,
  },
  focusedContainer: {
    borderColor: "#000",
    borderWidth: 2,
  },
  inputStyle: {
    fontSize: 18,
    color: "#000",
    top: 12,
    textAlignVertical: "center",
  },
  createButtonContainer: {
    width: "100%",
    marginTop: 10,
  },
  createButton: {
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#000",
  },
  createButtonTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginVertical: 15,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: "#888",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    width: "100%",
  },
  googleLogo: {
    width: 22,
    height: 22,
    marginRight: 10,
    resizeMode: "contain",
  },
  googleText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  signinContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  signinText: {
    fontSize: 14,
    color: "#888",
  },
  signinLink: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
});

export default SignupScreen;

