import { clsx } from "clsx";
import { useState } from "react";
import { Platform, ScrollView, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DesignSystemScreen = () => {
  const [isThemeLight, setIsThemeLight] = useState(true);

  return (
    <SafeAreaView
      className={clsx("flex-1", {
        "bg-light-background": !!isThemeLight,
        "bg-dark-background": !isThemeLight,
      })}
    >
      <View className="items-center">
        <Text>Default</Text>
        <Text
          style={{
            fontFamily: Platform.select({
              android: "Poppins_300Light",
              ios: "Poppins",
            }),
            fontWeight: "300",
          }}
        >
          Light
        </Text>
        <Text
          style={{
            fontFamily: Platform.select({
              android: "Poppins_400Regular",
              ios: "Poppins",
            }),
            fontWeight: "400",
          }}
        >
          Regular
        </Text>
        <Text
          style={{
            fontFamily: Platform.select({
              android: "Poppins_500Medium",
              ios: "Poppins",
            }),
            fontWeight: "500",
          }}
        >
          Medium
        </Text>
        <Text
          style={{
            fontFamily: Platform.select({
              android: "Poppins_600SemiBold",
              ios: "Poppins",
            }),
            fontWeight: "600",
          }}
        >
          Semi bold
        </Text>
        <Text
          style={{
            fontFamily: Platform.select({
              android: "Poppins_700Bold",
              ios: "Poppins",
            }),
            fontWeight: "700",
          }}
        >
          Bold
        </Text>
      </View>

      <View className="w-full flex-row items-center justify-between p-4">
        <Text
          className={clsx("flex-1", {
            "text-light-neutral100": !!isThemeLight,
            "text-dark-neutral100": !isThemeLight,
          })}
        >
          Light Theme ?
        </Text>
        <Switch
          onChange={() => setIsThemeLight((value) => !value)}
          value={!!isThemeLight}
        />
      </View>

      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-4 px-4"
      >
        {isThemeLight ? (
          <>
            <View className="mb-2 h-20 w-full bg-light-primary"></View>
            <View className="mb-2 h-20 w-full bg-light-secondary"></View>
            <View className="mb-2 h-20 w-full bg-light-tertiary"></View>
            <View className="mb-2 h-20 w-full bg-light-success"></View>
            <View className="mb-2 h-20 w-full bg-light-warning"></View>
            <View className="mb-2 h-20 w-full bg-light-error"></View>
            <View className="mb-2 h-20 w-full bg-light-neutral100"></View>
            <View className="mb-2 h-20 w-full bg-light-neutral200"></View>
            <View className="mb-2 h-20 w-full bg-light-neutral300"></View>
            <View className="mb-2 h-20 w-full bg-light-background"></View>
            <View className="mb-2 h-20 w-full bg-light-surface"></View>
          </>
        ) : (
          <>
            <View className="mb-2 h-20 w-full bg-dark-primary"></View>
            <View className="mb-2 h-20 w-full bg-dark-secondary"></View>
            <View className="mb-2 h-20 w-full bg-dark-tertiary"></View>
            <View className="mb-2 h-20 w-full bg-dark-success"></View>
            <View className="mb-2 h-20 w-full bg-dark-warning"></View>
            <View className="mb-2 h-20 w-full bg-dark-error"></View>
            <View className="mb-2 h-20 w-full bg-dark-neutral100"></View>
            <View className="mb-2 h-20 w-full bg-dark-neutral200"></View>
            <View className="mb-2 h-20 w-full bg-dark-neutral300"></View>
            <View className="mb-2 h-20 w-full bg-dark-background"></View>
            <View className="mb-2 h-20 w-full bg-dark-surface"></View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DesignSystemScreen;
