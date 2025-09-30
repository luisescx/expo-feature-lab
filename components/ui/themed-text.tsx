import { useThemeStore } from "@/stores/theme";
import { Platform, Text, type TextProps } from "react-native";
import { tv } from "tailwind-variants";

export type ThemedTextProps = TextProps & {
  type?: "base" | "title" | "subtitle" | "link";
};

const themedText = tv({
  variants: {
    theme: {
      light: "text-light-neutral200",
      dark: "text-dark-neutral200",
    },
    type: {
      base: "text-base", // medium
      title: "text-3xl", // bold
      subtitle: "text-xl", // semibold
      link: "text-sm", // light
    },
  },
  defaultVariants: {
    type: "base",
    theme: "light",
  },
});

export function ThemedText({
  type,
  className,
  style,
  ...rest
}: ThemedTextProps) {
  const theme = useThemeStore((state) => state.theme);

  return (
    <Text
      className={themedText({
        type,
        theme,
        class: className,
      })}
      style={[
        {
          fontFamily: Platform.select({
            android: "Poppins_700Bold",
            ios: "Poppins",
          }),
        },
        style,
      ]}
      {...rest}
    />
  );
}
