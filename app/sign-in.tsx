import LabLogo from "@/assets/images/expo-feature-lab-logo.png";
import { ScreenView, ThemedText } from "@/components/ui";
import { useThemeStore } from "@/stores/theme";
import { Image } from "expo-image";
import { Platform, Switch, Text, View } from "react-native";

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

        <Text
          className="text-2xl text-dark-neutral200"
          style={{
            fontFamily: Platform.select({
              android: "Poppins_600SemiBold",
              ios: "Poppins",
            }),
            // fontWeight: "700",
          }}
        >
          Expo Feature Lab
        </Text>
      </View>

      <View className="items-center text-center">
        <ThemedText
          // className="mb-2 text-3xl text-dark-neutral200"
          // style={{
          //   fontFamily: Platform.select({
          //     android: "Poppins_700Bold",
          //     ios: "Poppins",
          //   }),
          // }}
          type="title"
          className="mb-2"
        >
          Welcome
        </ThemedText>

        <Text
          className="mb-6 text-center text-xl text-dark-neutral200"
          style={{
            fontFamily: Platform.select({
              android: "Poppins_400Regular",
              ios: "Poppins",
            }),
          }}
        >
          Please login to your account
        </Text>
      </View>
    </ScreenView>
  );
}
