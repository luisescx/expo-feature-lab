import { useThemeStore } from "@/stores/theme";
import { type ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { tv } from "tailwind-variants";

export type ThemedViewProps = ViewProps & {
  themedSpacing?: "sm" | "md" | "lg";
};

const view = tv({
  base: "flex-1",
  variants: {
    theme: {
      light: "bg-light-background",
      dark: "bg-dark-background",
    },
    spacing: {
      sm: "p-2",
      md: "p-3",
      lg: "p-4",
    },
  },
  defaultVariants: {
    spacing: "sm",
    theme: "light",
  },
});

export function ScreenView({
  themedSpacing = "md",
  className,
  ...rest
}: ThemedViewProps) {
  const theme = useThemeStore((state) => state.theme);

  return (
    <SafeAreaView
      className={view({
        theme,
        spacing: themedSpacing,
        class: className,
      })}
      {...rest}
    />
  );
}
