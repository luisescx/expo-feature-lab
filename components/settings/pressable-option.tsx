import { useThemeStore } from "@/stores/theme";
import clsx from "clsx";
import { Pressable, type TouchableOpacityProps, View } from "react-native";
import { ThemedText } from "../ui";
import { IconNameProps, IconSymbol } from "../ui/icon-symbol";

type PressableOptionProps = {
  iconName: IconNameProps;
  title: string;
  description: string;
} & TouchableOpacityProps;

export function PressableOption({
  title,
  iconName,
  description,
  ...rest
}: PressableOptionProps) {
  const theme = useThemeStore((state) => state.theme);

  return (
    <Pressable className={`bg-${theme}-surface active:opacity-70`} {...rest}>
      <View className="flex-row items-center justify-between p-5">
        <View className="flex-row items-center">
          <IconSymbol
            color={`text-${theme}-neutral100`}
            name={iconName}
            size={14}
          />

          <View className="pl-5">
            <ThemedText>{title}</ThemedText>
            <ThemedText
              className={clsx({
                "text-light-neutral300": theme === "light",
                "text-dark-neutral300": theme === "dark",
              })}
              type="light"
            >
              {description}
            </ThemedText>
          </View>
        </View>

        <IconSymbol color={`text-${theme}-neutral100`} name="right" size={14} />
      </View>

      <View
        className={clsx("h-[0.5px]", {
          "bg-light-neutral300": theme === "light",
          "bg-dark-neutral300": theme === "dark",
        })}
      />
    </Pressable>
  );
}
