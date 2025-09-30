import { useThemeStore } from "@/stores/theme";
import { LocalStorageEnum, LocalStorageService } from "@/utils/storage";
import { SplashScreen } from "expo-router";
import { PropsWithChildren, useEffect } from "react";
import { useColorScheme } from "react-native";

export function SessionProvider({ children }: PropsWithChildren) {
  const systemTheme = useColorScheme() ?? "light";
  const setTheme = useThemeStore((state) => state.setTheme);

  useEffect(() => {
    const init = async () => {
      try {
        const currentStorageTheme = await LocalStorageService.get(
          LocalStorageEnum.customTheme,
        );

        if (!!currentStorageTheme) {
          setTheme(currentStorageTheme);
        } else {
          setTheme(systemTheme);
        }
      } catch (error) {
        console.error("SessionProvider init error:", error);
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    init();
  }, []);

  return <>{children}</>;
}
