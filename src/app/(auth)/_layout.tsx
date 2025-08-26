import { AuthProvider } from "@/context/AuthProvider";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { View} from "react-native"



export default function AuthLayout() {
  return (
    <AuthProvider>
      <SafeAreaView>
        <View className="p-4">
            <Stack screenOptions={{ headerShown: false }} />
        </View>
      </SafeAreaView>
    </AuthProvider>
  );
}
