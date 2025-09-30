import { Providers } from "@/contexts";
import { useAuthStore } from "@/stores/auth";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import "react-native-reanimated";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <Providers>
      <RootNavigator />
      <StatusBar style="auto" />
    </Providers>
  );
}

function RootNavigator() {
  const isSigned = useAuthStore((state) => state.isSigned);

  return (
    <Stack>
      <Stack.Protected guard={!!isSigned}>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!isSigned}>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
