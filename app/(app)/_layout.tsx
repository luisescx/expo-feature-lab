import { Header } from "@/components/ui";
import { useTranslation } from "@/hooks/use-translation";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Stack } from "expo-router";
import React from "react";

export default function AppLayout() {
  const { translation } = useTranslation();

  return (
    <Stack initialRouteName="(tabs)">
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="task-list"
        options={{
          title: translation("screens.taskList.title"),
          header: (props: NativeStackHeaderProps) => (
            <Header {...props} hasGoBackButton />
          ),
        }}
      />
      <Stack.Screen
        name="theme"
        options={{
          title: translation("screens.theme.title"),
          header: (props: NativeStackHeaderProps) => (
            <Header {...props} hasGoBackButton />
          ),
        }}
      />
      <Stack.Screen
        name="language"
        options={{
          title: translation("screens.language.title"),
          header: (props: NativeStackHeaderProps) => (
            <Header {...props} hasGoBackButton />
          ),
        }}
      />
    </Stack>
  );
}
