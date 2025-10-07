import { EdgesArray, useThemedInsets } from "@/hooks/use-themed-insets";
import { useThemeStore } from "@/stores/theme";
import { type ViewProps } from "react-native";
import { Edges, SafeAreaView } from "react-native-safe-area-context";
import { tv } from "tailwind-variants";

export type ThemedViewProps = ViewProps & {
  themedSpacing?: "sm" | "md" | "lg";
  edges?: Edges;
  addInsets?: EdgesArray;
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
    spacing: "md",
    theme: "light",
  },
});

export function ScreenView({
  themedSpacing = "md",
  className,
  edges = [],
  addInsets = [],
  style,
  ...rest
}: ThemedViewProps) {
  const theme = useThemeStore((state) => state.theme);
  const styleInsets = useThemedInsets(themedSpacing, ["bottom"]);

  return (
    <SafeAreaView
      className={view({
        theme,
        spacing: themedSpacing,
        class: className,
      })}
      style={[{ ...styleInsets }, style]}
      {...rest}
    />
  );
}
