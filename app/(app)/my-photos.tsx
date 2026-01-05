import { EmptyPhotos, RenderPhoto } from "@/components/my-photos";
import { Button, ScreenView } from "@/components/ui";
import { useTranslation } from "@/hooks/use-translation";
import {
  CameraCapturedPicture,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useCallback, useRef, useState } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native";
import { openSettings } from "react-native-permissions";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type PhotoProps = {
  id: string;
  date: string;
  uri: string;
};

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

export default function MyPhotosScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photoTaken, setPhotoTaken] = useState<CameraCapturedPicture | null>(
    null,
  );
  const [dynamicMockData, setDynamicMockData] =
    useState<PhotoProps[]>(MOCK_DATA);

  const [absoluteViewHeight, setAbsoluteViewHeight] = useState(0);

  const insets = useSafeAreaInsets();

  const { translation } = useTranslation();
  // const styleInsets = useThemedInsets("md", ["bottom"]);

  const cameraRef = useRef<CameraView>(null);

  const takePhoto = useCallback(async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo);
      setPhotoTaken(photo);
      setIsCameraOpen(false);
    }
  }, []);

  const handleCameraPermission = useCallback(async () => {
    if (permission?.granted) setIsCameraOpen(true);

    if (permission?.canAskAgain) {
      await requestPermission();
      return;
    }

    await openSettings();
  }, [permission, requestPermission]);

  const renderPhotosItem = useCallback(
    ({ item }: ListRenderItemInfo<PhotoProps>) => <RenderPhoto {...item} />,
    [],
  );

  return (
    <ScreenView className="p-0">
      <FlatList
        keyExtractor={({ id }) => id.toString()}
        data={dynamicMockData}
        showsVerticalScrollIndicator={false}
        horizontal={false}
        numColumns={2}
        contentContainerClassName="p-3 flex-grow"
        contentContainerStyle={{
          paddingBottom: absoluteViewHeight + insets.bottom + 12,
        }}
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: 12,
              height: 12,
            }}
          />
        )}
        columnWrapperClassName="justify-between"
        renderItem={renderPhotosItem}
        ListEmptyComponent={
          <EmptyPhotos onTakePhoto={handleCameraPermission} />
        }
      />

      {dynamicMockData?.length > 0 && (
        <View
          className="w-full items-center bg-light-primary/30 p-4"
          style={{
            position: "absolute",
            bottom: insets?.bottom ?? 0,
          }}
          onLayout={(e) => {
            setAbsoluteViewHeight(e?.nativeEvent?.layout?.height ?? 0);
          }}
        >
          <Button
            onPress={handleCameraPermission}
            iconName="camera"
            className="w-3/4"
          >
            {translation("screens.myPhotos.hasPhotos.button")}
          </Button>
        </View>
      )}
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 64,
    flexDirection: "row",
    backgroundColor: "transparent",
    width: "100%",
    paddingHorizontal: 64,
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
