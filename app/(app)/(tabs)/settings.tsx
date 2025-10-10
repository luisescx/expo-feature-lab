import { PressableOption } from "@/components/settings";
import { ScrollViewThemed } from "@/components/ui";
import { useTranslation } from "@/hooks/use-translation";
import { useSessionStore } from "@/stores/session";

export default function SettingsScreen() {
  const { translation } = useTranslation();
  const handleLogout = useSessionStore((state) => state.handleLogout);

  return (
    <ScrollViewThemed className="p-0">
      <PressableOption
        iconName="moon"
        title={translation("settings.theme")}
        description={translation("settings.themeDescription")}
        onPress={() => {
          //
        }}
      />
      <PressableOption
        iconName="italic"
        title={translation("settings.language")}
        description={translation("settings.languageDescription")}
        onPress={() => {
          //
        }}
      />
      <PressableOption
        iconName="poweroff"
        title={translation("settings.logout")}
        description={translation("settings.logoutDescription")}
        onPress={async () => {
          await handleLogout();
        }}
      />
    </ScrollViewThemed>
  );
}
