import { ClerkProvider } from "@clerk/clerk-expo";
import { Slot } from "expo-router";
import { Stack } from "expo-router";
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import SafeScreen from "@/components/SafeScreen";
export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <SafeScreen>
        {/* <Stack
          screenOptions={{
            headerShown: false,
          }}
        /> */}
      <Slot />
      </SafeScreen>
    </ClerkProvider>
  );
}
