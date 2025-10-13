import { PressableOption } from "@/components/settings";
import { ScrollViewThemed } from "@/components/ui";
import { useTranslation } from "@/hooks/use-translation";
import { useSessionStore } from "@/stores/session";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

export default function SettingsScreen() {
  const { translation } = useTranslation();
  const handleLogout = useSessionStore((state) => state.handleLogout);
  const { navigate } = useRouter();

  const createSignOutAlert = async () =>
    Alert.alert(
      translation("screens.settings.logoutActions.title"),
      translation("screens.settings.logoutActions.subtitle"),
      [
        {
          text: translation("screens.settings.logoutActions.cancel"),
          style: "cancel",
        },
        {
          text: translation("screens.settings.logoutActions.confirm"),
          onPress: async () => {
            await handleLogout();
          },
        },
      ],
    );

  return (
    <ScrollViewThemed className="p-0">
      <PressableOption
        iconName="sun"
        title={translation("screens.settings.theme")}
        description={translation("screens.settings.themeDescription")}
        onPress={() => navigate("/theme")}
      />
      <PressableOption
        iconName="italic"
        title={translation("screens.settings.language")}
        description={translation("screens.settings.languageDescription")}
        onPress={() => navigate("/language")}
      />
      <PressableOption
        iconName="poweroff"
        title={translation("screens.settings.logout")}
        description={translation("screens.settings.logoutDescription")}
        onPress={async () => await createSignOutAlert()}
      />
    </ScrollViewThemed>
  );
}
