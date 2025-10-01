import { useThemeStore } from "@/stores/theme";
import { useMemo } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { tv } from "tailwind-variants";

import { ButtonLoading } from "./button-loading";
import { ThemedText } from "./themed-text";

type ButtonProps = {
  children: React.ReactNode;
  size?: "sm" | "md";
  width?: "full" | "half";
  isLoading?: boolean;
  type?: "solid" | "outlined";
  colorType?:
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "warning"
    | "surface";
} & TouchableOpacityProps;

const solidBaseButton = tv({
  base: "w-full flex-row items-center justify-center rounded-lg disabled:opacity-70",
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
      success: "bg-light-success",
      error: "bg-light-error",
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
      success: "bg-dark-success",
      error: "bg-dark-error",
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
      success: "bg-light-surface",
      error: "bg-light-surface",
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
      success: "bg-dark-neutral100",
      error: "bg-dark-neutral100",
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
      success: "text-light-surface",
      error: "text-light-surface",
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
      success: "text-dark-neutral100",
      error: "text-dark-neutral100",
      warning: "text-dark-background",
      surface: "text-dark-neutral100",
    },
  },
});

const outlinedBaseButton = tv({
  base: "w-full flex-row items-center justify-center rounded-lg bg-transparent disabled:opacity-70",
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
      success: "border-light-success",
      error: "border-light-error",
      warning: "border-light-warning",
      surface: "border-light-background",
    },
  },
  compoundVariants: [
    {
      colorType: [
        "primary",
        "secondary",
        "success",
        "primary",
        "error",
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
      success: "border-dark-success",
      error: "border-dark-error",
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
      success: "text-light-success",
      error: "text-light-error",
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
      success: "text-dark-success",
      error: "text-dark-error",
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
      success: "bg-dark-success",
      error: "bg-dark-error",
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
      success: "bg-light-success",
      error: "bg-light-error",
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
    <TouchableOpacity
      activeOpacity={0.7}
      className={renderTvButton.button({
        size,
        colorType,
        class: className,
      })}
      hitSlop={8}
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
        <ThemedText
          className={renderTvButton.label({
            colorType,
            size,
          })}
          type="titleSemi"
        >
          {children}
        </ThemedText>
      )}
    </TouchableOpacity>
  );
};

export { Button };
