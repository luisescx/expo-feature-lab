import { useThemeStore } from "@/stores/theme";
import { Platform, StyleSheet, Text, type TextProps } from "react-native";
import { tv } from "tailwind-variants";

export type ThemedTextProps = TextProps & {
  type?: "base" | "title" | "titleSemi" | "subtitle" | "link" | "light";
};

const themedText = tv({
  variants: {
    theme: {
      light: "text-light-neutral100",
      dark: "text-dark-neutral100",
    },
    type: {
      base: "text-base",
      light: "text-sm",
      title: "text-3xl",
      titleSemi: "text-3xl",
      subtitle: "text-xl",
      link: "text-sm underline",
    },
  },
  defaultVariants: {
    type: "base",
    theme: "light",
  },
});

export function ThemedText({
  type = "base",
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
        class: `${type === "link" && theme === "light" ? "text-light-link active:text-light-link/70" : ""} ${type === "link" && theme === "dark" ? "text-dark-link active:text-dark-link/70" : ""} ${className}`,
      })}
      style={[
        type === "base" ? styles.base : undefined,
        type === "title" ? styles.title : undefined,
        type === "titleSemi" ? styles.titleSemi : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: Platform.select({
      android: "Poppins_500Medium",
      ios: "Poppins",
      default: "Poppins",
    }),
    fontWeight: Platform.select({
      ios: "500",
    }),
  },
  light: {
    fontFamily: Platform.select({
      android: "Poppins_300Light",
      ios: "Poppins",
      default: "Poppins",
    }),
    fontWeight: Platform.select({
      ios: "300",
    }),
  },
  title: {
    fontFamily: Platform.select({
      android: "Poppins_700Bold",
      ios: "Poppins",
      default: "Poppins",
    }),
    fontWeight: Platform.select({
      ios: "700",
    }),
  },
  titleSemi: {
    fontFamily: Platform.select({
      android: "Poppins_600SemiBold",
      ios: "Poppins",
      default: "Poppins",
    }),
    fontWeight: Platform.select({
      ios: "600",
    }),
  },
  subtitle: {
    fontFamily: Platform.select({
      android: "Poppins_500Medium",
      ios: "Poppins",
      default: "Poppins",
    }),
    fontWeight: Platform.select({
      ios: "500",
    }),
  },
  link: {
    fontFamily: Platform.select({
      android: "Poppins_400Regular",
      ios: "Poppins",
      default: "Poppins",
    }),
    fontWeight: Platform.select({
      ios: "400",
    }),
  },
});
