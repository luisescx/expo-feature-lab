import { PhotoProps } from "@/app/(app)/my-photos";
import { useThemeStore } from "@/stores/theme";
import { customColors } from "@/tailwind.config";
import clsx from "clsx";
import { Image } from "expo-image";
import { useCallback, useState } from "react";
import { Dimensions, Pressable, View } from "react-native";
import { tv } from "tailwind-variants";
import { ThemedText } from "../ui";
import { IconColor, IconSymbol } from "../ui/icon-symbol";

const HORIZONTAL_PADDING = 12;
const WIDTH = Dimensions.get("window").width - HORIZONTAL_PADDING * 2;
const PERCENTAGE = (HORIZONTAL_PADDING * 100) / WIDTH;
const WIDTH_TOTAL = (100 - PERCENTAGE) / 2;

type RenderPhotoProps = {
  photo: PhotoProps;
  isPhotoSelected: boolean;
  isOnePressSelectToDelete: boolean;
  onSelectPhotoToDelete: (id: string) => void;
  onRemoveSelectedPhotoToDelete: (id: string) => void;
};

const selectedPhotoBorderContainer = tv({
  base: "absolute top-0 z-30 w-full rounded-lg border-[2px] opacity-70",
  variants: {
    theme: {
      light: "border-light-primary",
      dark: "border-dark-primary",
    },
  },
  defaultVariants: {
    theme: "light",
  },
});

const iconViewContainer = tv({
  base: "absolute -left-2 -top-2 z-50 h-10 w-10 items-center justify-center rounded-full",
  variants: {
    theme: {
      light: "bg-light-primary",
      dark: "bg-dark-primary",
    },
  },
  defaultVariants: {
    theme: "light",
  },
});

export function RenderPhoto({
  isOnePressSelectToDelete = false,
  photo,
  isPhotoSelected,
  onSelectPhotoToDelete,
  onRemoveSelectedPhotoToDelete,
}: RenderPhotoProps) {
  const { date, id, uri } = photo;

  const [textHeightView, setTextHeightView] = useState(0);

  const theme = useThemeStore((state) => state.theme);

  const handleOnPress = useCallback(() => {
    if (isPhotoSelected) {
      onRemoveSelectedPhotoToDelete(id);
      return;
    }

    if (isOnePressSelectToDelete) {
      onSelectPhotoToDelete(id);
    }
  }, [
    isPhotoSelected,
    isOnePressSelectToDelete,
    onRemoveSelectedPhotoToDelete,
    id,
    onSelectPhotoToDelete,
  ]);

  const handleOnLongPress = useCallback(() => {
    if (isPhotoSelected) {
      onRemoveSelectedPhotoToDelete(id);
      return;
    }

    onSelectPhotoToDelete(id);
  }, [
    id,
    isPhotoSelected,
    onRemoveSelectedPhotoToDelete,
    onSelectPhotoToDelete,
  ]);

  return (
    <Pressable
      className="active:opacity-60"
      style={{
        width: `${WIDTH_TOTAL}%`,
      }}
      onPress={handleOnPress}
      onLongPress={handleOnLongPress}
    >
      {isPhotoSelected && (
        <>
          <View
            className={selectedPhotoBorderContainer({
              theme,
            })}
            style={{ bottom: textHeightView ?? 0 }}
          />

          <View
            className={iconViewContainer({
              theme,
            })}
          >
            <IconSymbol
              name="check"
              size={20}
              color={
                theme === "light"
                  ? (customColors.light.surface as IconColor)
                  : (customColors.dark.neutral100 as IconColor)
              }
            />
          </View>
        </>
      )}

      <Image
        source={uri}
        className={clsx("w-full rounded-lg", {
          "opacity-70": isPhotoSelected,
        })}
        style={{
          height: WIDTH / 2,
        }}
        contentFit="cover"
        transition={500}
      />

      <View
        onLayout={(event) =>
          setTextHeightView(event?.nativeEvent?.layout?.height ?? 0)
        }
      >
        <ThemedText type="base" className="mt-2 text-center">
          {date}
        </ThemedText>
      </View>
    </Pressable>
  );
}
