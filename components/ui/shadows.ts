import { Platform, ViewStyle } from "react-native";

interface ShadowProps {
  s1: ViewStyle;
  s2: ViewStyle;
  s3: ViewStyle;
}

const shadows: ShadowProps = {
  s1: Platform.select({
    ios: {
      shadowColor: "rgba(59, 59, 59, 0.08)",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 1,
      shadowRadius: 4,
    },
    android: {
      elevation: 2,
    },
  }) as ViewStyle,

  s2: Platform.select({
    ios: {
      shadowColor: "rgba(0, 0, 0, 0.04)",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 16,
    },
    android: {
      elevation: 4,
    },
  }) as ViewStyle,

  s3: Platform.select({
    ios: {
      shadowColor: "rgba(59, 59, 59, 0.16)",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 16,
    },
    android: {
      elevation: 6,
    },
  }) as ViewStyle,
};

export default shadows;
