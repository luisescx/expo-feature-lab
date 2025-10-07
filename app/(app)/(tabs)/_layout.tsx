import { TabBar } from "@/components/tab-bar";
import { Header } from "@/components/ui";
import { IconColor, IconSymbol } from "@/components/ui/icon-symbol";
import { ThemeStates, useThemeStore } from "@/stores/theme";
import { customColors } from "@/tailwind.config";
import {
  BottomTabHeaderProps,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import React, { useCallback, useState } from "react";
import { Platform } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

const handleScreenOptions = (
  theme: ThemeStates,
  insets: EdgeInsets,
): BottomTabNavigationOptions => {
  return {
    tabBarStyle: {
      backgroundColor: customColors[theme].surface,
      borderTopColor: customColors[theme].neutral300,
      height: 100,
    },
    tabBarLabelStyle: {
      fontFamily: Platform.select({
        android: "Poppins_500Medium",
        ios: "Poppins",
        default: "Poppins",
      }),
      fontWeight: Platform.select({
        ios: "500",
      }),
    },
    tabBarActiveTintColor: customColors[theme].primary,
    tabBarInactiveTintColor: customColors[theme].neutral300,
    tabBarHideOnKeyboard: true,
    tabBarShowLabel: true,
  };
};

export default function TabLayout() {
  const [tabIndex, setTabIndex] = useState(0);

  const theme = useThemeStore((state) => state.theme);
  const insets = useSafeAreaInsets();

  const handleTabChange = useCallback((event: any) => {
    const selectedTabIndex = event?.data.state.index ?? 0;

    setTabIndex(selectedTabIndex);
  }, []);

  return (
    <Tabs
      initialRouteName="index"
      backBehavior="none"
      screenListeners={{ state: handleTabChange }}
      screenOptions={() => {
        return {
          ...handleScreenOptions(theme, insets),
          tabBarBackground: () => {
            return <TabBar tabIndex={tabIndex} />;
          },
        };
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={20} name="home" color={color as IconColor} />
          ),
          header: (props: BottomTabHeaderProps) => (
            <Header {...props} hasTitle={false} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={20} name="user" color={color as IconColor} />
          ),
          header: (props: BottomTabHeaderProps) => (
            <Header {...props} hasTitle={false} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={20} name="setting" color={color as IconColor} />
          ),
          header: (props: BottomTabHeaderProps) => (
            <Header {...props} hasTitle={false} />
          ),
        }}
      />
    </Tabs>
  );
}
