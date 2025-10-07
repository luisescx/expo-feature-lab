import { useThemeStore } from "@/stores/theme";
import { useMemo } from "react";
import { Dimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { tv } from "tailwind-variants";

const widthScreen = Dimensions.get("screen").width;

const view = tv({
  base: "absolute h-[2px] rounded-s-md",
  variants: {
    theme: {
      light: "bg-dark-primary",
      dark: "bg-light-primary",
    },
  },
});

type TabBarProps = {
  tabIndex: number;
};

export function TabBar({ tabIndex }: TabBarProps) {
  const theme = useThemeStore((state) => state.theme);
  const insets = useSafeAreaInsets();

  const style = useMemo(() => {
    const tabWidth = widthScreen / 3;

    const xAxis = tabIndex * tabWidth + tabWidth * 0.25;

    return {
      left: xAxis,
      width: tabWidth / 2,
    };
  }, [tabIndex]);

  return (
    <View
      className={view({
        theme,
      })}
      style={{
        bottom: insets.bottom ?? 0,
        ...style,
      }}
    />
  );
}
