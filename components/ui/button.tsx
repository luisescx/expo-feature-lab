import { useThemeStore } from "@/stores/theme";
import { useMemo } from "react";
import { Pressable, TouchableOpacityProps, View } from "react-native";
import { tv } from "tailwind-variants";

import { ButtonLoading } from "./button-loading";
import { IconColor, IconNameProps, IconSymbol } from "./icon-symbol";
import shadows from "./shadows";
import { ThemedText } from "./themed-text";

type ButtonColorProps =
  | "primary"
  | "secondary"
  | "positive"
  | "negative"
  | "warning"
  | "surface";

type ButtonProps = {
  children: React.ReactNode;
  size?: "sm" | "md";
  width?: "full" | "half";
  isLoading?: boolean;
  type?: "solid" | "outlined";
  colorType?: ButtonColorProps;
  iconName?: IconNameProps;
} & TouchableOpacityProps;

const solidBaseButton = tv({
  base: "w-full flex-row items-center justify-center rounded-lg active:opacity-70 disabled:opacity-70",
  variants: {
    size: {
      sm: "p-2",
      md: "p-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const lightSolidButton = tv({
  extend: solidBaseButton,
  variants: {
    colorType: {
      primary: "bg-light-primary",
      secondary: "bg-light-secondary",
      positive: "bg-light-positive",
      negative: "bg-light-negative",
      warning: "bg-light-warning",
      surface: "bg-light-background",
    },
  },
});

const darkSolidButton = tv({
  extend: solidBaseButton,
  variants: {
    colorType: {
      primary: "bg-dark-primary",
      secondary: "bg-dark-secondary",
      positive: "bg-dark-positive",
      negative: "bg-dark-negative",
      warning: "bg-dark-warning",
      surface: "bg-dark-background",
    },
  },
});

const solidLightLoadingButton = tv({
  variants: {
    colorType: {
      primary: "bg-light-surface",
      secondary: "bg-light-surface",
      positive: "bg-light-surface",
      negative: "bg-light-surface",
      warning: "bg-light-neutral100",
      surface: "bg-light-neutral100",
    },
  },
});

const solidDarkLoadingButton = tv({
  variants: {
    colorType: {
      primary: "bg-dark-neutral100",
      secondary: "bg-dark-neutral100",
      positive: "bg-dark-neutral100",
      negative: "bg-dark-neutral100",
      warning: "bg-dark-background",
      surface: "bg-dark-neutral100",
    },
  },
});

const baseLabel = tv({
  variants: {
    size: {
      sm: "text-base",
      md: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const lightSolidLabel = tv({
  extend: baseLabel,
  variants: {
    colorType: {
      primary: "text-light-surface",
      secondary: "text-light-surface",
      positive: "text-light-surface",
      negative: "text-light-surface",
      warning: "text-light-neutral100",
      surface: "text-light-neutral100",
    },
  },
});

const darkSolidLabel = tv({
  extend: baseLabel,
  variants: {
    colorType: {
      primary: "text-dark-neutral100",
      secondary: "text-dark-neutral100",
      positive: "text-dark-neutral100",
      negative: "text-dark-neutral100",
      warning: "text-dark-background",
      surface: "text-dark-neutral100",
    },
  },
});

const outlinedBaseButton = tv({
  base: "w-full flex-row items-center justify-center rounded-lg bg-transparent active:opacity-70 disabled:opacity-50",
  variants: {
    size: {
      sm: "p-2",
      md: "p-3",
      lg: "p-4",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const lightOutlinedButton = tv({
  extend: outlinedBaseButton,
  base: "border border-solid",
  variants: {
    colorType: {
      primary: "border-light-primary",
      secondary: "border-light-secondary",
      positive: "border-light-positive",
      negative: "border-light-negative",
      warning: "border-light-warning",
      surface: "border-light-background",
    },
  },
  compoundVariants: [
    {
      colorType: [
        "primary",
        "secondary",
        "positive",
        "primary",
        "negative",
        "warning",
        "surface",
      ],
    },
  ],
});

const darkOutlinedButton = tv({
  extend: outlinedBaseButton,
  base: "border border-solid",
  variants: {
    colorType: {
      primary: "border-dark-primary",
      secondary: "border-dark-secondary",
      positive: "border-dark-positive",
      negative: "border-dark-negative",
      warning: "border-dark-warning",
      surface: "border-dark-background",
    },
  },
});

const lightOutlinedLabel = tv({
  extend: baseLabel,
  variants: {
    colorType: {
      primary: "text-light-primary",
      secondary: "text-light-secondary",
      positive: "text-light-positive",
      negative: "text-light-negative",
      warning: "text-light-warning",
      surface: "text-light-background",
    },
  },
});

const darkOutlinedLabel = tv({
  extend: baseLabel,
  variants: {
    colorType: {
      primary: "text-dark-primary",
      secondary: "text-dark-secondary",
      positive: "text-dark-positive",
      negative: "text-dark-negative",
      warning: "text-dark-warning",
      surface: "text-dark-background",
    },
  },
});

const outlinedDarkLoadingButton = tv({
  variants: {
    colorType: {
      primary: "bg-dark-primary",
      secondary: "bg-dark-secondary",
      positive: "bg-dark-positive",
      negative: "bg-dark-negative",
      warning: "bg-dark-warning",
      surface: "bg-dark-background",
    },
  },
});

const outlinedLightLoadingButton = tv({
  variants: {
    colorType: {
      primary: "bg-light-primary",
      secondary: "bg-light-secondary",
      positive: "bg-light-positive",
      negative: "bg-light-negative",
      warning: "bg-light-warning",
      surface: "bg-light-background",
    },
  },
});

const Button = ({
  size = "md",
  type = "solid",
  colorType = "primary",
  isLoading = false,
  children,
  className,
  iconName,
  style,
  ...rest
}: ButtonProps) => {
  const theme = useThemeStore((state) => state.theme);

  const renderTvButton = useMemo(() => {
    if (type === "solid") {
      if (theme === "light") {
        return {
          button: lightSolidButton,
          label: lightSolidLabel,
          loadingColor: solidLightLoadingButton,
        };
      }

      return {
        button: darkSolidButton,
        label: darkSolidLabel,
        loadingColor: solidDarkLoadingButton,
      };
    }

    if (theme === "light") {
      return {
        button: lightOutlinedButton,
        label: lightOutlinedLabel,
        loadingColor: outlinedLightLoadingButton,
      };
    }

    return {
      button: darkOutlinedButton,
      label: darkOutlinedLabel,
      loadingColor: outlinedDarkLoadingButton,
    };
  }, [theme, type]);

  return (
    <Pressable
      className={renderTvButton.button({
        size,
        colorType,
        class: className,
      })}
      hitSlop={8}
      style={[type !== "outlined" && shadows.s2, style]}
      {...rest}
    >
      {!!isLoading && (
        <ButtonLoading
          size={size}
          className={renderTvButton.loadingColor({
            colorType,
          })}
        />
      )}

      {!isLoading && (
        <>
          <ThemedText
            className={renderTvButton.label({
              colorType,
              size,
            })}
            type="titleSemi"
          >
            {children}
          </ThemedText>

          {!!iconName && (
            <View className="absolute right-4 ml-4">
              <IconSymbol
                color={
                  renderTvButton.loadingColor({
                    colorType,
                  }) as IconColor
                }
                name={iconName}
              />
            </View>
          )}
        </>
      )}
    </Pressable>
  );
};

export { Button };
