import { Camera, PhotosList } from "@/components/my-photos";
import { Button, ScreenView } from "@/components/ui";
import FocusAwareStatusBar from "@/components/ui/focus-aware-status-bar";
import { useTranslation } from "@/hooks/use-translation";
import { useThemeStore } from "@/stores/theme";
import { customColors } from "@/tailwind.config";
import { CameraCapturedPicture, useCameraPermissions } from "expo-camera";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, View } from "react-native";
import { openSettings } from "react-native-permissions";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MOCK_DATA = [
  {
    id: "1",
    date: "yyyy-mm-dd",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN2z0ERwXQUqH29urPuzWueLXKhJAY6SMyAA&s",
  },
  {
    id: "2",
    date: "yyyy-mm-dd",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN2z0ERwXQUqH29urPuzWueLXKhJAY6SMyAA&s",
  },
  {
    id: "3",
    date: "yyyy-mm-dd",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN2z0ERwXQUqH29urPuzWueLXKhJAY6SMyAA&s",
  },
  {
    id: "4",
    date: "yyyy-mm-dd",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN2z0ERwXQUqH29urPuzWueLXKhJAY6SMyAA&s",
  },
  {
    id: "5",
    date: "yyyy-mm-dd",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN2z0ERwXQUqH29urPuzWueLXKhJAY6SMyAA&s",
  },
  {
    id: "6",
    date: "yyyy-mm-dd",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN2z0ERwXQUqH29urPuzWueLXKhJAY6SMyAA&s",
  },
  {
    id: "7",
    date: "yyyy-mm-dd",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN2z0ERwXQUqH29urPuzWueLXKhJAY6SMyAA&s",
  },
  {
    id: "8",
    date: "yyyy-mm-dd",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN2z0ERwXQUqH29urPuzWueLXKhJAY6SMyAA&s",
  },
] as PhotoProps[];

export type PhotoProps = {
  id: string;
  date: string;
  uri: string;
};

export default function MyPhotosScreen() {
  const [dynamicMockData, setDynamicMockData] =
    useState<PhotoProps[]>(MOCK_DATA);
  const [permission, requestPermission] = useCameraPermissions();

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photoTaken, setPhotoTaken] = useState<CameraCapturedPicture | null>(
    null,
  );

  const { setOptions, goBack } = useNavigation();
  const { translation } = useTranslation();
  const { bottom, top } = useSafeAreaInsets();
  const theme = useThemeStore((state) => state.theme);

  const takePhoto = useCallback(async (photo: CameraCapturedPicture) => {
    setPhotoTaken(photo);
    setIsCameraOpen(false);
  }, []);

  const handleCameraPermission = useCallback(async () => {
    if (permission?.granted) {
      setIsCameraOpen(true);
      setOptions({
        headerShown: false,
      });
    }

    if (permission?.canAskAgain) {
      await requestPermission();
      return;
    }

    await openSettings();
  }, [
    permission?.canAskAgain,
    permission?.granted,
    requestPermission,
    setOptions,
  ]);

  const handleCloseCamera = useCallback(() => {
    setIsCameraOpen(false);
    setPhotoTaken(null);

    setOptions({
      headerShown: true,
    });
  }, [setOptions]);

  const handleRetryTakePhoto = useCallback(() => {
    setIsCameraOpen(true);
    setPhotoTaken(null);
  }, []);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (photoTaken || isCameraOpen) {
          handleCloseCamera();
        } else {
          goBack();
        }

        return true;
      },
    );

    return () => subscription.remove();
  }, [photoTaken, isCameraOpen]);

  return (
    <ScreenView className="p-0">
      {!photoTaken && isCameraOpen && (
        <Camera onCloseCamera={handleCloseCamera} onTakePhoto={takePhoto} />
      )}

      {!!photoTaken && !isCameraOpen && (
        <>
          <FocusAwareStatusBar
            style={"light"}
            backgroundColor={customColors[theme].primary}
          />
          <View
            className="flex-1"
            style={{
              paddingBottom: bottom,
              paddingTop: top,
            }}
          >
            <Image
              source={photoTaken?.uri}
              className="w-full flex-1"
              contentFit="cover"
              transition={500}
            />

            <View className="w-full items-center p-3">
              <Button
                onPress={handleCloseCamera}
                iconName="save"
                className="mb-3 w-3/4"
              >
                {translation("screens.myPhotos.takenPicture.save")}
              </Button>

              <Button
                onPress={handleRetryTakePhoto}
                iconName="camera"
                colorType="secondary"
                className="mb-3 w-3/4"
              >
                {translation("screens.myPhotos.takenPicture.retry")}
              </Button>

              <Button
                onPress={handleCloseCamera}
                iconName="delete"
                colorType="negative"
                className="w-3/4"
              >
                {translation("screens.myPhotos.takenPicture.discard")}
              </Button>
            </View>
          </View>
        </>
      )}

      {!photoTaken && !isCameraOpen && (
        <PhotosList
          photos={dynamicMockData}
          onSavedPhotos={setDynamicMockData}
          onCameraPermission={handleCameraPermission}
        />
      )}
    </ScreenView>
  );
}
