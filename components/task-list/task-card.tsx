import { useThemeStore } from "@/stores/theme";
import clsx from "clsx";
import { type TouchableOpacityProps, View } from "react-native";
import { Card, ThemedText } from "../ui";
import { IconNameProps, IconSymbol } from "../ui/icon-symbol";

type TaskCardProps = {
  iconName: IconNameProps;
  title: string;
} & TouchableOpacityProps;

export function TaskCard({
  title,
  iconName,
  className,
  ...rest
}: TaskCardProps) {
  const theme = useThemeStore((state) => state.theme);

  return (
    <Card className={clsx("flex-row items-center p-6", className)} {...rest}>
      <IconSymbol name={iconName} color={`text-${theme}-primary`} />

      <ThemedText type="subtitle" className="ml-6">
        {title}
      </ThemedText>

      <View className="absolute right-4">
        <IconSymbol name="right" color={`text-${theme}-neutral100`} size={16} />
      </View>
    </Card>
  );
}
