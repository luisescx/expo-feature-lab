import {
  Button,
  ScrollViewThemed,
  ThemedText,
  ThemeToggle,
} from "@/components/ui";
import { useTranslation } from "@/hooks/use-translation";
import { View } from "react-native";

export default function SettingsScreen() {
  const { handleChangeLanguage } = useTranslation();

  return (
    <ScrollViewThemed className="items-center justify-center">
      <ThemedText>Settings</ThemedText>

      <View className="mt-4" />
      <ThemeToggle />

      <View className="mt-4" />

      <Button
        className="mb-4"
        onPress={() =>
          handleChangeLanguage({
            language: "pt",
            saveOnStorage: false,
          })
        }
      >
        Portuguese
      </Button>
      <Button
        className="mb-4"
        onPress={() =>
          handleChangeLanguage({
            language: "en",
            saveOnStorage: false,
          })
        }
      >
        English
      </Button>
      <Button
        className="mb-4"
        onPress={() =>
          handleChangeLanguage({
            language: "es",
            saveOnStorage: false,
          })
        }
      >
        Spanish
      </Button>
    </ScrollViewThemed>
  );
}
