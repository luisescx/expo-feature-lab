import { ScrollViewThemed } from "@/components/ui";
import { PressableRadio } from "@/components/ui/pressable-radio";
import { useTranslation } from "@/hooks/use-translation";
import { ThemeSource, ThemeStates, useThemeStore } from "@/stores/theme";
import { useCallback } from "react";
import { useColorScheme } from "react-native";

export default function ThemeScreen() {
  const { translation } = useTranslation();

  const theme = useThemeStore((state) => state.theme);
  const systemTheme = useColorScheme() ?? "light";
  const isUsingSystemTheme = useThemeStore((state) => state.isUsingSystemTheme);
  const toggleStorageTheme = useThemeStore((state) => state.toggleStorageTheme);

  const handleChangeTheme = useCallback(
    async (theme: ThemeStates, source: ThemeSource) => {
      await toggleStorageTheme(theme, source);
    },
    [toggleStorageTheme],
  );

  return (
    <ScrollViewThemed addInsets={["bottom"]} className="p-0" hasPadding={false}>
      <PressableRadio
        iconName="sun"
        title={translation("screens.theme.light")}
        isActive={!isUsingSystemTheme && theme === "light"}
        onPress={() => handleChangeTheme("light", "app")}
      />
      <PressableRadio
        iconName="moon"
        title={translation("screens.theme.dark")}
        isActive={!isUsingSystemTheme && theme === "dark"}
        onPress={() => handleChangeTheme("dark", "app")}
      />
      <PressableRadio
        iconName="mobile"
        title={translation("screens.theme.device")}
        description={translation("screens.theme.deviceDescription")}
        isActive={!!isUsingSystemTheme}
        onPress={() => handleChangeTheme(systemTheme, "system")}
      />
    </ScrollViewThemed>
  );
}
