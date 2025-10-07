import { useTranslation } from "@/hooks/use-translation";
import { useLanguageStore } from "@/stores/language";
import { useSessionStore } from "@/stores/session";
import { useThemeStore } from "@/stores/theme";
import { LocalStorageEnum, LocalStorageService } from "@/utils/storage";
import { SplashScreen } from "expo-router";
import { PropsWithChildren, useEffect, useRef } from "react";
import { AppState, AppStateStatus, useColorScheme } from "react-native";

export function SessionProvider({ children }: PropsWithChildren) {
  const systemTheme = useColorScheme() ?? "light";
  const setLocalTheme = useThemeStore((state) => state.setLocalTheme);
  const setIsUsingSystemTheme = useThemeStore(
    (state) => state.setIsUsingSystemTheme,
  );
  const setIsSigned = useSessionStore((state) => state.setIsSigned);
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  const appState = useRef<AppStateStatus>(AppState.currentState);

  const { handleLanguageIsSupported } = useTranslation();

  useEffect(() => {
    const init = async () => {
      try {
        const currentStorageTheme = await LocalStorageService.get(
          LocalStorageEnum.customTheme,
        );

        if (!!currentStorageTheme) {
          setLocalTheme(currentStorageTheme);
          setIsUsingSystemTheme(false);
        } else {
          setLocalTheme(systemTheme);
        }

        const isUserAuth = await LocalStorageService.get(
          LocalStorageEnum.userAuth,
        );

        const currentLanguageOnStorage = await LocalStorageService.get(
          LocalStorageEnum.language,
        );

        if (currentLanguageOnStorage) {
          await setLanguage({
            language: currentLanguageOnStorage,
            saveOnStorage: false,
          });
        }

        if (isUserAuth) {
          setIsSigned(true);
        }
      } catch (error) {
        console.error("SessionProvider init error:", error);
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    init();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      async (nextAppState) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
          const currentStorageTheme = await LocalStorageService.get(
            LocalStorageEnum.customTheme,
          );
          if (!currentStorageTheme) {
            setLocalTheme(systemTheme);
          }

          const currentLanguageOnStorage = await LocalStorageService.get(
            LocalStorageEnum.language,
          );

          if (!currentLanguageOnStorage) {
            const deviceLanguage = handleLanguageIsSupported();

            await setLanguage({
              language: deviceLanguage,
              saveOnStorage: false,
            });
          }
        }

        appState.current = nextAppState;
      },
    );

    return () => subscription.remove();
  }, [systemTheme]);

  return <>{children}</>;
}
