import { useIsFocused } from "@react-navigation/native";
import { StatusBar, StatusBarProps } from "expo-status-bar";
import * as React from "react";

const FocusAwareStatusBar = ({ ...rest }: StatusBarProps) => {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...rest} /> : null;
};

export default FocusAwareStatusBar;
