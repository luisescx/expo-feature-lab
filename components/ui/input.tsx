import { useThemeStore } from "@/stores/theme";
import { customColors } from "@/tailwind.config";
import clsx from "clsx";
import React, { useCallback, useState } from "react";
import {
  BlurEvent,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { tv } from "tailwind-variants";
import { IconColor, IconSymbol } from "./icon-symbol";
import { ThemedText } from "./themed-text";

type InputProps = {
  label?: string;
  errorMessage?: string | null;
  hasErrorValidation?: boolean;
  fieldHasError?: boolean;
} & TextInputProps;

const inputContainer = tv({
  base: "w-full",
});

const textInputField = tv({
  base: "flex-1 p-4",
  variants: {
    theme: {
      light: "text-light-neutral100",
      dark: "text-dark-neutral100",
    },
  },
});

const textErrorMessage = tv({
  base: "mt-1",
  variants: {
    theme: {
      light: "text-light-error",
      dark: "text-dark-error",
    },
  },
});

const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      errorMessage,
      hasErrorValidation = false,
      fieldHasError = false,
      secureTextEntry,
      label = "",
      style,
      textContentType,
      onBlur,
      className,
      ...rest
    },
    ref,
  ) => {
    const theme = useThemeStore((state) => state.theme);

    const [showPassword, setShowPassword] = useState<boolean>(
      secureTextEntry || false,
    );

    const [isActive, setIsActive] = useState(false);

    const handleFocus = useCallback(() => {
      setIsActive(true);
    }, []);

    const handleBlur = useCallback(
      (e: BlurEvent) => {
        setIsActive(false);
        if (onBlur) {
          onBlur(e);
        }
      },
      [onBlur],
    );

    return (
      <View
        className={inputContainer({
          className,
        })}
      >
        {!!label && (
          <View className="mb-1 flex-row">
            <ThemedText className="text-lg">{label}</ThemedText>
          </View>
        )}

        <View
          className={clsx(
            "flex-row items-center rounded-lg border border-solid",
            {
              "border-light-neutral300/25 bg-light-surface focus:border-light-neutral100":
                theme === "light" && !fieldHasError,
              "border-light-error bg-light-surface":
                theme === "light" && !!fieldHasError,
              "border-dark-neutral300/25 bg-dark-surface focus:border-dark-neutral100":
                theme === "dark" && !fieldHasError,
              "border-dark-error bg-dark-surface":
                theme === "dark" && !!fieldHasError,
            },
          )}
        >
          <TextInput
            ref={ref}
            className={textInputField({
              theme,
            })}
            style={[styles.inputField, style]}
            textContentType={textContentType}
            secureTextEntry={showPassword}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholderTextColor={customColors[theme].neutral300}
            {...rest}
          />

          {textContentType === "password" && (
            <Pressable
              onPress={() => setShowPassword((old) => !old)}
              className="pr-4 active:opacity-50"
            >
              <IconSymbol
                name={!showPassword ? "eye" : "eye-invisible"}
                color={
                  clsx({
                    "text-light-neutral100": theme === "light" && isActive,
                    "text-light-neutral300": theme === "light" && !isActive,
                    "text-dark-neutral100": theme === "dark" && isActive,
                    "text-dark-neutral300": theme === "dark" && !isActive,
                  }) as IconColor
                }
              />
            </Pressable>
          )}
        </View>

        {!!hasErrorValidation && (
          <ThemedText
            className={textErrorMessage({
              theme,
            })}
          >
            {fieldHasError ? `${errorMessage}` : " "}
          </ThemedText>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  inputField: {
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

Input.displayName = "Input";

export { Input };
