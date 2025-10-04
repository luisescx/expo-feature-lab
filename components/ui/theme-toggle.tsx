import { ThemeSource, ThemeStates, useThemeStore } from "@/stores/theme";
import { useCallback } from "react";
import { Pressable, useColorScheme, View } from "react-native";
import { tv } from "tailwind-variants";
import { IconColor, IconSymbol } from "./icon-symbol";

const pressable = tv({
  base: "rounded-full p-3 active:opacity-70",
});

const lightPressable = tv({
  extend: pressable,
  variants: {
    isActive: {
      true: "bg-slate-200/50",
      false: "bg-transparent",
    },
  },
});

const darkPressable = tv({
  extend: pressable,
  variants: {
    isActive: {
      true: "bg-dark-background",
      false: "bg-transparent",
    },
  },
});

const container = tv({
  base: "flex-row justify-between gap-x-4 rounded-full p-3",
});

const darkContainer = tv({
  extend: container,
  base: "border border-dark-neutral300/20 bg-dark-surface",
});

const lightContainer = tv({
  extend: container,
  base: "border border-light-neutral300/15 bg-light-surface",
});

const lightIcon = tv({
  variants: {
    isActive: {
      true: "text-light-neutral100",
      false: "rgb(55 65 81 / 0.4)",
    },
  },
});

const darkIcon = tv({
  variants: {
    isActive: {
      true: "text-dark-neutral200",
      false: "rgb(229 231 235 / 0.6)",
    },
  },
});

const themeVariants = {
  container: {
    dark: darkContainer,
    light: lightContainer,
  },
  icon: {
    dark: darkIcon,
    light: lightIcon,
  },
  pressable: {
    dark: darkPressable,
    light: lightPressable,
  },
};

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const systemTheme = useColorScheme() ?? "light";
  const toggleStorageTheme = useThemeStore((state) => state.toggleStorageTheme);
  const isUsingSystemTheme = useThemeStore((state) => state.isUsingSystemTheme);

  const handleChangeTheme = useCallback(
    async (theme: ThemeStates, source: ThemeSource) => {
      await toggleStorageTheme(theme, source);
    },
    [toggleStorageTheme],
  );

  return (
    <View className={themeVariants.container[theme]()}>
      <Pressable
        className={themeVariants.pressable[theme]({
          isActive: !isUsingSystemTheme && theme === "light",
        })}
        hitSlop={4}
        onPress={() => handleChangeTheme("light", "app")}
      >
        <IconSymbol
          name="sun"
          color={
            themeVariants.icon[theme]({
              isActive: !isUsingSystemTheme && theme === "light",
            }) as IconColor
          }
          size={20}
        />
      </Pressable>

      <Pressable
        className={themeVariants.pressable[theme]({
          isActive: !isUsingSystemTheme && theme === "dark",
        })}
        onPress={() => handleChangeTheme("dark", "app")}
      >
        <IconSymbol
          name="moon"
          color={
            themeVariants.icon[theme]({
              isActive: !isUsingSystemTheme && theme === "dark",
            }) as IconColor
          }
          size={20}
        />
      </Pressable>

      <Pressable
        className={themeVariants.pressable[theme]({
          isActive: !!isUsingSystemTheme,
        })}
        onPress={() => handleChangeTheme(systemTheme, "system")}
      >
        <IconSymbol
          name="mobile"
          color={
            themeVariants.icon[theme]({
              isActive: !!isUsingSystemTheme,
            }) as IconColor
          }
          size={20}
        />
      </Pressable>
    </View>
  );
}
