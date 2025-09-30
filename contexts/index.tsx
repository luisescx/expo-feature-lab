import { PropsWithChildren } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SessionProvider } from "./SessionProvider";

const Providers = ({ children }: PropsWithChildren) => (
  <SafeAreaProvider>
    <SessionProvider>{children}</SessionProvider>
  </SafeAreaProvider>
);

export { Providers };
