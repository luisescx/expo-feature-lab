import { useThemeStore } from "@/stores/theme";
import { PropsWithChildren } from "react";
import { type ScrollViewProps } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Edges, SafeAreaView } from "react-native-safe-area-context";
import { tv } from "tailwind-variants";

export type ThemedViewProps = ScrollViewProps & {
  themedSpacing?: "sm" | "md" | "lg";
  children: PropsWithChildren;
  edges?: Edges;
};

const safeArea = tv({
  variants: {
    theme: {
      light: "bg-light-background",
      dark: "bg-dark-background",
    },
  },
});

const view = tv({
  extend: safeArea,
  base: "flex-grow",
  variants: {
    spacing: {
      sm: "p-1",
      md: "p-2",
      lg: "p-4",
    },
  },
  defaultVariants: {
    spacing: "sm",
    theme: "light",
  },
});

export function ScrollViewThemed({
  themedSpacing = "md",
  className,
  children,
  edges = ["top", "bottom", "right", "left"],
  ...rest
}: ThemedViewProps) {
  const theme = useThemeStore((state) => state.theme);

  return (
    <SafeAreaView
      className={safeArea({
        theme,
        className: "flex-1",
      })}
      edges={edges}
    >
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerClassName={view({
          theme,
          spacing: themedSpacing,
          class: className,
        })}
        {...rest}
      >
        {children}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
