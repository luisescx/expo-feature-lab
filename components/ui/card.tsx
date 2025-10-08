import { useThemeStore } from "@/stores/theme";
import { Pressable, type TouchableOpacityProps } from "react-native";
import { tv } from "tailwind-variants";
import shadows from "./shadows";

type CardProps = {
  isPressable?: boolean;
  spacing?: "sm" | "md" | "lg";
} & TouchableOpacityProps;

const cardContainer = tv({
  base: "rounded-xl active:opacity-60",
  variants: {
    theme: {
      light: "bg-light-surface",
      dark: "bg-dark-surface",
    },
    spacing: {
      sm: "p-3",
      md: "p-4",
      lg: "p-5",
    },
  },
  defaultVariants: {
    theme: "light",
    spacing: "md",
  },
});

export function Card({
  isPressable = true,
  style,
  spacing = "md",
  className,
  ...rest
}: CardProps) {
  const theme = useThemeStore((state) => state.theme);

  return (
    <Pressable
      className={cardContainer({ theme, className })}
      disabled={!isPressable}
      style={[shadows.s1, style]}
      {...rest}
    />
  );
}
