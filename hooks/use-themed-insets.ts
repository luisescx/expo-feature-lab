import config from "@/tailwind.config";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import resolveConfig from "tailwindcss/resolveConfig";

export type ThemedSpacing = "sm" | "md" | "lg";
export type EdgesArray = ("top" | "bottom" | "left" | "right")[];

const fullConfig = resolveConfig(config);

function parseRem(value: string) {
  if (value.endsWith("rem")) return parseFloat(value) * 16;
  if (value.endsWith("px")) return parseFloat(value);
  return Number(value);
}

const themedSpacingConverter = {
  sm: parseRem(fullConfig.theme.spacing[2]),
  md: parseRem(fullConfig.theme.spacing[3]),
  lg: parseRem(fullConfig.theme.spacing[4]),
};

type StyleInsetsProps = {
  paddingTop?: number;
  paddingBottom?: number;
  paddingRight?: number;
  paddingLeft?: number;
};

const handleInsets = (
  spacing: ThemedSpacing,
  addInsets: EdgesArray,
  insets: EdgeInsets,
  hasPadding?: boolean,
) => {
  const style: StyleInsetsProps = {};

  if (addInsets.includes("top")) {
    style.paddingTop =
      (insets.top ?? 0) +
      (hasPadding ? (themedSpacingConverter[spacing] ?? 0) : 0);
  }
  if (addInsets.includes("bottom")) {
    style.paddingBottom =
      (insets.bottom ?? 0) +
      (hasPadding ? (themedSpacingConverter[spacing] ?? 0) : 0);
  }
  if (addInsets.includes("right")) {
    style.paddingRight =
      (insets.right ?? 0) +
      (hasPadding ? (themedSpacingConverter[spacing] ?? 0) : 0);
  }
  if (addInsets.includes("left")) {
    style.paddingLeft =
      (insets.left ?? 0) +
      (hasPadding ? (themedSpacingConverter[spacing] ?? 0) : 0);
  }

  return style;
};

export function useThemedInsets(
  spacing: ThemedSpacing,
  edges: EdgesArray = ["top", "bottom"],
  hasPadding = true,
) {
  const insets = useSafeAreaInsets();

  return handleInsets(spacing, edges, insets, hasPadding);
}
