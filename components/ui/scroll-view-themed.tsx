import {
  EdgesArray,
  ThemedSpacing,
  useThemedInsets,
} from "@/hooks/use-themed-insets";
import { useThemeStore } from "@/stores/theme";
import { PropsWithChildren } from "react";
import { type ScrollViewProps } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Edges, SafeAreaView } from "react-native-safe-area-context";
import { tv } from "tailwind-variants";

export type ThemedViewProps = ScrollViewProps & {
  themedSpacing?: ThemedSpacing;
  children: PropsWithChildren;
  edges?: Edges;
  addInsets?: EdgesArray;
  hasPadding?: boolean;
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

export function ScrollViewThemed({
  themedSpacing = "md",
  className,
  children,
  edges = [],
  addInsets = [],
  hasPadding = true,
  style,
  ...rest
}: ThemedViewProps) {
  const theme = useThemeStore((state) => state.theme);

  const styleInsets = useThemedInsets(themedSpacing, addInsets, hasPadding);

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
        contentContainerStyle={[{ ...styleInsets }, style]}
        {...rest}
      >
        {children}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
