import { useThemeStore } from "@/stores/theme";
import clsx from "clsx";
import { Pressable, type TouchableOpacityProps, View } from "react-native";
import { ThemedText } from "../ui";
import { IconNameProps, IconSymbol } from "../ui/icon-symbol";

type PressableRadioProps = {
  iconName: IconNameProps;
  title: string;
  description?: string;
  hasIcon?: boolean;
  isActive: boolean;
} & TouchableOpacityProps;

export function PressableRadio({
  title,
  iconName,
  description,
  isActive,
  hasIcon = true,
  ...rest
}: PressableRadioProps) {
  const theme = useThemeStore((state) => state.theme);

  return (
    <Pressable className={`bg-${theme}-surface active:opacity-70`} {...rest}>
      <View className="flex-row items-center justify-between p-5">
        <View className="flex-1 flex-row flex-wrap items-center pr-4">
          {!!hasIcon && (
            <IconSymbol
              color={`text-${theme}-neutral100`}
              name={iconName}
              size={14}
            />
          )}

          <View className={clsx("flex-1", hasIcon && "pl-5")}>
            <ThemedText className="flex-shrink" numberOfLines={0}>
              {title}
            </ThemedText>
            {!!description && (
              <ThemedText
                className={clsx("flex-shrink", {
                  "text-light-neutral300": theme === "light",
                  "text-dark-neutral300": theme === "dark",
                })}
                type="light"
                numberOfLines={0}
              >
                {description}
              </ThemedText>
            )}
          </View>
        </View>

        <View
          className={clsx(
            "h-5 w-5 items-center justify-center rounded-full border",
            {
              "border-light-neutral100": theme === "light",
              "border-dark-neutral100": theme === "dark",
            },
          )}
        >
          <View
            className={clsx(
              isActive && `bg-${theme}-neutral100 h-2 w-2 rounded-full`,
            )}
          />
        </View>
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
