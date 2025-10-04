import { PropsWithChildren } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SessionProvider } from "./SessionProvider";

const Providers = ({ children }: PropsWithChildren) => (
  <SafeAreaProvider>
    <KeyboardProvider>
      <SessionProvider>{children}</SessionProvider>
    </KeyboardProvider>
  </SafeAreaProvider>
);

export { Providers };
