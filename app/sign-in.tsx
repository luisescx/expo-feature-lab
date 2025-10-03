import LabLogo from "@/assets/images/expo-feature-lab-logo.png";
import { Button, ScreenView, ThemedText } from "@/components/ui";
import { useThemeStore } from "@/stores/theme";
import { Image } from "expo-image";
import { Switch, View } from "react-native";

export default function SignIn() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <ScreenView>
      <Switch value={theme === "dark"} onValueChange={toggleTheme} />
      <View className="my-8 flex-row items-center justify-center">
        <Image
          source={LabLogo}
          style={{
            width: 48,
            height: 48,
          }}
        />

        <ThemedText type="titleSemi" className="text-2xl">
          Expo Feature Lab
        </ThemedText>
      </View>

      <View className="items-center text-center">
        <ThemedText type="title" className="mb-2">
          Welcome
        </ThemedText>

        <ThemedText className="mb-6" type="subtitle">
          Please login to your account
        </ThemedText>
      </View>

      <View className="w-full items-center justify-center">
        <Button className="mb-4 w-[85%]" colorType="primary">
          Login
        </Button>
        <Button className="mb-4 w-[85%]" colorType="primary">
          Login
        </Button>
      </View>
    </ScreenView>
  );
}
