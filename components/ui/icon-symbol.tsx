import { customColors, CustomTheme } from "@/tailwind.config";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ComponentProps } from "react";
import { type StyleProp, type TextStyle } from "react-native";
import colors from "tailwindcss/colors";

type TailwindColorName = keyof typeof colors;

type TailwindColor = {
  [K in TailwindColorName]: `${K}-${Extract<keyof (typeof colors)[K], string>}`;
}[TailwindColorName];

type CustomColor = {
  [K in keyof CustomTheme]: `${K}-${Extract<keyof CustomTheme[K], string>}`;
}[keyof CustomTheme];

export type IconColor = `text-${TailwindColor}` | `text-${CustomColor}`;

export type IconNameProps = ComponentProps<typeof MaterialIcons>["name"];

type IConSymbolProps = {
  name: IconNameProps;
  size?: number;
  color: IconColor;
  style?: StyleProp<TextStyle>;
};

function resolveTailwindColor(color?: IconColor): string | undefined {
  if (!color) return undefined;

  const [, name, shade] = color.split("-");

  if (name === "light" || name === "dark") {
    const palette = (customColors as any)[name];
    return palette?.[shade] ?? color;
  }

  const palette = (colors as any)[name];
  return palette?.[shade] ?? color;
}

export function IconSymbol({ name, size = 24, color, style }: IConSymbolProps) {
  return (
    <MaterialIcons
      color={resolveTailwindColor(color)}
      size={size}
      name={name}
      style={style}
    />
  );
}
