import FocusAwareStatusBar from "@/components/ui/focus-aware-status-bar";
import { Providers } from "@/contexts";
import { useSessionStore } from "@/stores/session";
import { useThemeStore } from "@/stores/theme";
import { customColors } from "@/tailwind.config";
import { Image } from "expo-image";
import { SplashScreen, Stack } from "expo-router";
import { cssInterop } from "nativewind";

import "react-native-reanimated";
import "../global.css";

cssInterop(Image, { className: "style" });

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <Providers>
      <RootNavigator />
      <FocusAwareStatusBar style={theme === "light" ? "dark" : "light"} />
    </Providers>
  );
}

function RootNavigator() {
  const isSigned = useSessionStore((state) => state.isSigned);
  const theme = useThemeStore((state) => state.theme);

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor:
            theme === "light"
              ? customColors.light.background
              : customColors.dark.background,
        },
      }}
    >
      <Stack.Protected guard={!isSigned}>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!!isSigned}>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
