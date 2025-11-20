import ImageFolder from "@/assets/images/image-folder.png";
import { Button, ThemedText } from "@/components/ui";
import { useTranslation } from "@/hooks/use-translation";
import { Image } from "expo-image";
import { Dimensions, View } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

type EmptyPhotosProps = {
  onTakePhoto: () => Promise<void>;
};

export function EmptyPhotos({ onTakePhoto }: EmptyPhotosProps) {
  const { translation } = useTranslation();

  return (
    <View className="flex-1 items-center justify-center">
      <Image
        source={ImageFolder}
        style={{
          width: SCREEN_WIDTH - 32,
          height: SCREEN_WIDTH - 32,
        }}
      />

      <View className="mb-5 items-center">
        <ThemedText type="titleSemi" className="mb-3 text-center">
          {translation("screens.myPhotos.noPhotos.title")}
        </ThemedText>

        <ThemedText className="text-center">
          {translation("screens.myPhotos.noPhotos.subtitle")}
        </ThemedText>
      </View>

      <View className="w-full items-center">
        <Button onPress={onTakePhoto} iconName="camera" className="w-2/3">
          {translation("screens.myPhotos.noPhotos.button")}
        </Button>
      </View>
    </View>
  );
}
