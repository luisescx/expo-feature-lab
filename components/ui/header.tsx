import { useThemeStore } from "@/stores/theme";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import clsx from "clsx";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { tv } from "tailwind-variants";
import FocusAwareStatusBar from "./focus-aware-status-bar";
import { IconSymbol } from "./icon-symbol";
import { ThemedText } from "./themed-text";

type HeaderProps = {
  hasGoBackButton?: boolean;
  hasTitle?: boolean;
} & (BottomTabHeaderProps | NativeStackHeaderProps);

const container = tv({
  base: "relative flex-row items-center justify-center p-4",
  variants: {
    theme: {
      light: "bg-light-primary",
      dark: "bg-dark-primary",
    },
  },
});

export function Header({
  hasGoBackButton = false,
  hasTitle = true,
  options,
}: HeaderProps) {
  const theme = useThemeStore((state) => state.theme);
  const { top } = useSafeAreaInsets();
  const { title } = options;

  const { back } = useRouter();

  return (
    <View
      className={container({
        theme,
      })}
      style={{
        paddingTop: 16 + (top ?? 0),
      }}
    >
      <FocusAwareStatusBar style="light" />
      {!!hasGoBackButton && (
        <Pressable
          className="absolute bottom-4 left-4 active:opacity-70"
          hitSlop={12}
          onPress={() => back()}
        >
          <IconSymbol name="left" color="text-dark-neutral200" size={20} />
        </Pressable>
      )}

      <ThemedText
        type="subtitle"
        className={clsx({
          "text-light-surface": theme === "light",
          "text-dark-neutral100": theme === "dark",
        })}
      >
        {hasTitle ? `${title}` : "Expo Feature Lab"}
      </ThemedText>
    </View>
  );
}
