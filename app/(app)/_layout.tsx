import { Header } from "@/components/ui";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Stack } from "expo-router";
import React from "react";

export default function AppLayout() {
  return (
    <Stack initialRouteName="(tabs)">
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="to-do-list"
        options={{
          title: "To Do List",
          header: (props: NativeStackHeaderProps) => (
            <Header {...props} hasGoBackButton />
          ),
        }}
      />
    </Stack>
  );
}
