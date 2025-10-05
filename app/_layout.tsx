import { Providers } from "@/contexts";
import { useSessionStore } from "@/stores/session";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { useThemeStore } from "@/stores/theme";
import "react-native-reanimated";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <Providers>
      <RootNavigator />
      <StatusBar style={theme === "light" ? "dark" : "light"} />
    </Providers>
  );
}

function RootNavigator() {
  const isSigned = useSessionStore((state) => state.isSigned);

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
