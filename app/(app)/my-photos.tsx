import { Camera, PhotosList } from "@/components/my-photos";
import { ScreenView } from "@/components/ui";
import { CameraCapturedPicture, useCameraPermissions } from "expo-camera";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import { useCallback, useState } from "react";
import { openSettings } from "react-native-permissions";

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

  const { setOptions } = useNavigation();

  const takePhoto = useCallback(async (photo: CameraCapturedPicture) => {
    console.log(photo);
    setPhotoTaken(photo);
    setIsCameraOpen(false);
  }, []);

  const handleCloseCamera = useCallback(() => {
    setIsCameraOpen(false);
    setOptions({
      headerShown: true,
    });
  }, [setOptions]);

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

  return (
    <ScreenView className="p-0">
      {!photoTaken && isCameraOpen && (
        <Camera onCloseCamera={handleCloseCamera} onTakePhoto={takePhoto} />
      )}

      {!!photoTaken && !isCameraOpen && (
        <Image
          source={photoTaken?.uri}
          className="w-full"
          style={{
            height: 200,
          }}
          contentFit="cover"
          transition={500}
        />
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
