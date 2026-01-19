import { CameraCapturedPicture, CameraType, CameraView } from "expo-camera";
import { useCallback, useRef, useState } from "react";
import { Dimensions, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "../ui/icon-symbol";

const WIDTH_SCREEN = Dimensions.get("screen").width;

type CameraProps = {
  onCloseCamera: () => void;
  onTakePhoto: (photoTaken: CameraCapturedPicture) => Promise<void>;
};

export function Camera({ onCloseCamera, onTakePhoto }: CameraProps) {
  const [facing, setFacing] = useState<CameraType>("front");
  const [cameraButtonSizes, setCameraButtonSizes] = useState({
    width: 0,
    height: 0,
  });

  const { top, bottom } = useSafeAreaInsets();

  const cameraRef = useRef<CameraView>(null);

  const handleTakePhoto = useCallback(async () => {
    if (cameraRef?.current) {
      const photo = await cameraRef.current.takePictureAsync();

      onTakePhoto(photo);
    }
  }, [onTakePhoto]);

  return (
    <>
      <Pressable
        className="absolute left-4 z-50 rounded-full bg-dark-primary p-3 active:opacity-70"
        style={{
          top: top + 32,
        }}
        hitSlop={12}
        onPress={onCloseCamera}
      >
        <IconSymbol name="left" color="text-dark-neutral200" size={20} />
      </Pressable>

      <CameraView
        ref={cameraRef}
        style={{
          flex: 1,
        }}
        facing={facing}
      />

      <Pressable
        className="absolute z-50 rounded-full bg-dark-primary p-6 active:opacity-70"
        onLayout={(e) =>
          setCameraButtonSizes({
            width: Math.floor(e?.nativeEvent?.layout?.width ?? 0),
            height: Math.floor(e?.nativeEvent?.layout?.height ?? 0),
          })
        }
        style={{
          bottom: bottom + 32,
          left: WIDTH_SCREEN / 2 - cameraButtonSizes.height / 2,
        }}
        hitSlop={12}
        onPress={handleTakePhoto}
      >
        <IconSymbol name="camera" color="text-dark-neutral200" size={32} />
      </Pressable>

      <Pressable
        className="absolute right-4 z-50 rounded-full bg-dark-primary p-5 active:opacity-70"
        style={{
          bottom: bottom + 32 + cameraButtonSizes.height,
        }}
        hitSlop={12}
        onPress={() =>
          setFacing((oldFacing) => (oldFacing === "front" ? "back" : "front"))
        }
      >
        <IconSymbol name="sync" color="text-dark-neutral200" size={28} />
      </Pressable>
    </>
  );
}
