import { useAuth } from "@/context/AuthProvider";
import { Link, useRouter } from "expo-router";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function RegisterScreen() {
  const { isLoggedIn, login } = useAuth();
  const router = useRouter();

  if (isLoggedIn) {
    router.replace("/");
  }

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!emailAddress || !password) {
        setError("Email and password are required.");
        return;
      }
      await login(emailAddress, password);
    } catch (err: any) {
      setError(err.message || "Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
        {/* Header */}
        <View className="items-center mb-8 mt-16">
          <View className="h-20 w-20 bg-yellow-600 rounded-2xl items-center justify-center mb-4 shadow-lg">
            <Ionicons name="code" size={40} color="white" />
          </View>
          <Text className="text-3xl font-semibold text-gray-800">PKenya</Text>
          <Text className="text-lg text-gray-500 text-center">
            Verify Professionals Instantly {"\n"} on the Go
          </Text>
        </View>

        {/* Form */}
        <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <Text className="text-2xl font-bold text-gray-600 mb-6 text-center">
            Create Your Account
          </Text>

          {/* Email Input */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </Text>
            <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4 border border-gray-200">
              <Ionicons name="mail-outline" size={20} color={"#607D8B"} />
              <TextInput
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="Email"
                placeholderTextColor="#9CA3AF"
                value={emailAddress}
                onChangeText={setEmailAddress}
                className="flex-1 ml-2 text-gray-900 border-none outline-none"
                editable={!isLoading}
              />
            </View>
          </View>

          {/* Password Input */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Password
            </Text>
            <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4 border border-gray-200">
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={"#607D8B"}
              />
              <TextInput
                secureTextEntry
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                className="flex-1 ml-2 text-gray-900 border-none outline-none"
                editable={!isLoading}
              />
            </View>
          </View>

          {/* Button */}
          <TouchableOpacity
            onPress={handleSignIn}
            disabled={isLoading}
            className={`bg-yellow-600 rounded-xl py-4 mt-6 ${
              isLoading ? "opacity-50" : ""
            }`}
            activeOpacity={0.8}
          >
            <View className="flex-row items-center justify-center">
              {isLoading ? (
                <ActivityIndicator color="white" size={28} />
              ) : (
                <Text className="text-white text-center text-lg font-semibold">
                  Sign Up
                </Text>
              )}
            </View>
          </TouchableOpacity>
          <Text className="text-xs text-gray-500 text-center mt-4">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </View>

        {/* Footer */}
        <View className="pb-6 flex-row items-center justify-center">
          <Text className="text-sm text-yellow-500">
            Already have an account?{" "}
            <Link href="/login" className="text-yellow-600 font-semibold">
              Sign In
            </Link>
          </Text>
        </View>
    </KeyboardAvoidingView>
  );
}
