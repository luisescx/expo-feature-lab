import { ScrollViewThemed } from "@/components/ui";
import { PressableRadio } from "@/components/ui/pressable-radio";
import { useTranslation } from "@/hooks/use-translation";
import { useEffect, useState } from "react";

export default function LanguageScreen() {
  const [isUsingLanguageSystem, setIsUsingLanguageSystem] = useState(true);

  const {
    translation,
    language,
    handleChangeLanguage,
    handleDeviceLanguage,
    handleLanguageOnStorage,
  } = useTranslation();

  useEffect(() => {
    const init = async () => {
      const isOnStorage = await handleLanguageOnStorage();

      if (isOnStorage) {
        setIsUsingLanguageSystem(false);
      }
    };

    init();
  }, []);

  return (
    <ScrollViewThemed addInsets={["bottom"]} className="p-0" hasPadding={false}>
      <PressableRadio
        iconName="sun"
        title={translation("screens.language.english")}
        hasIcon={false}
        isActive={!isUsingLanguageSystem && language === "en"}
        onPress={async () => {
          setIsUsingLanguageSystem(false);
          await handleChangeLanguage({
            language: "en",
            saveOnStorage: true,
          });
        }}
      />
      <PressableRadio
        iconName="moon"
        title={translation("screens.language.portuguese")}
        hasIcon={false}
        isActive={!isUsingLanguageSystem && language === "pt"}
        onPress={async () => {
          setIsUsingLanguageSystem(false);
          await handleChangeLanguage({
            language: "pt",
            saveOnStorage: true,
          });
        }}
      />
      <PressableRadio
        iconName="mobile"
        title={translation("screens.language.spanish")}
        hasIcon={false}
        isActive={!isUsingLanguageSystem && language === "es"}
        onPress={async () => {
          setIsUsingLanguageSystem(false);
          await handleChangeLanguage({
            language: "es",
            saveOnStorage: true,
          });
        }}
      />
      <PressableRadio
        iconName="mobile"
        title={translation("screens.language.device")}
        description={translation("screens.language.deviceDescription")}
        hasIcon={false}
        isActive={!!isUsingLanguageSystem}
        onPress={async () => {
          setIsUsingLanguageSystem(true);
          await handleDeviceLanguage();
        }}
      />
    </ScrollViewThemed>
  );
}
