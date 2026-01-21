import { PhotoProps } from "@/app/(app)/my-photos";
import { useTranslation } from "@/hooks/use-translation";
import { useThemeStore } from "@/stores/theme";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Animated,
  FlatList,
  ListRenderItemInfo,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { tv } from "tailwind-variants";
import { Button, ThemedText } from "../ui";
import { EmptyPhotos } from "./empty-photos";
import { RenderPhoto } from "./render-photo";

type PhotoListProps = {
  photos: PhotoProps[];
  onSavedPhotos: (photos: PhotoProps[]) => void;
  onCameraPermission: () => Promise<void>;
};

const selectedPhotosView = tv({
  base: "w-full border",
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

const buttonsContainer = tv({
  base: "absolute w-full items-center p-4",
  variants: {
    theme: {
      light: "bg-light-primary/70",
      dark: "bg-dark-primary/70",
    },
  },
  defaultVariants: {
    theme: "light",
  },
});

const button = tv({
  base: "mb-3 w-3/4",
  variants: {
    spacing: {
      hasSpacing: "mb-3",
      noSpacing: "mb-0",
    },
  },
  defaultVariants: {
    spacing: "hasSpacing",
  },
});

export function PhotosList({
  photos,
  onSavedPhotos,
  onCameraPermission,
}: PhotoListProps) {
  const [showPhotosSelectedNumber, setShowPhotosSelectedNumber] =
    useState(false);

  const [selectedPhotosToDelete, setSelectedPhotosToDelete] = useState<
    string[]
  >([]);
  const [absoluteViewHeight, setAbsoluteViewHeight] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const theme = useThemeStore((state) => state.theme);

  const hasPhotosSelectedToDelete = useMemo(() => {
    return selectedPhotosToDelete?.length > 0;
  }, [selectedPhotosToDelete]);

  const insets = useSafeAreaInsets();

  const { translation } = useTranslation();

  const onSelectPhotoToDelete = useCallback((photoId: string) => {
    setSelectedPhotosToDelete((oldList) => [...oldList, photoId]);
  }, []);

  const onRemoveSelectedPhotoToDelete = useCallback(
    (photoId: string) => {
      const newList = selectedPhotosToDelete.filter((id) => id !== photoId);

      setSelectedPhotosToDelete(newList);
    },
    [selectedPhotosToDelete],
  );

  const renderPhotosItem = useCallback(
    ({ item }: ListRenderItemInfo<PhotoProps>) => (
      <RenderPhoto
        photo={item}
        isPhotoSelected={selectedPhotosToDelete.some(
          (photoId) => photoId === item.id,
        )}
        isOnePressSelectToDelete={selectedPhotosToDelete?.length > 0}
        onRemoveSelectedPhotoToDelete={onRemoveSelectedPhotoToDelete}
        onSelectPhotoToDelete={onSelectPhotoToDelete}
      />
    ),
    [
      onRemoveSelectedPhotoToDelete,
      onSelectPhotoToDelete,
      selectedPhotosToDelete,
    ],
  );

  const handleSelectAllPhotos = useCallback(() => {
    const allPhotosListIds = photos.map((photo) => photo.id);

    setSelectedPhotosToDelete(allPhotosListIds);
  }, [photos]);

  const handleDeletePhotos = useCallback(() => {
    const idsToDelete = new Set(selectedPhotosToDelete);
    const newPhotosList = photos.filter((photo) => !idsToDelete.has(photo.id));

    setSelectedPhotosToDelete([]);
    onSavedPhotos(newPhotosList);
    setShowPhotosSelectedNumber(false);
  }, [onSavedPhotos, photos, selectedPhotosToDelete]);

  const deletePhotosConfirmation = useCallback(
    () =>
      Alert.alert(
        translation("screens.myPhotos.deletePhotosAlert.title"),
        translation("screens.myPhotos.deletePhotosAlert.subtitle"),
        [
          {
            text: translation("screens.myPhotos.deletePhotosAlert.cancel"),
            style: "cancel",
          },
          {
            text: translation("screens.myPhotos.deletePhotosAlert.confirm"),
            onPress: () => {
              handleDeletePhotos();
            },
          },
        ],
      ),
    [handleDeletePhotos, translation],
  );

  const fadeIn = useCallback(() => {
    setShowPhotosSelectedNumber(true);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const fadeOut = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setShowPhotosSelectedNumber(false);
    });
  }, [fadeAnim]);

  useEffect(() => {
    if (hasPhotosSelectedToDelete) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [hasPhotosSelectedToDelete]);

  return (
    <>
      {showPhotosSelectedNumber && (
        <Animated.View
          style={[
            {
              opacity: fadeAnim,
            },
          ]}
          className={selectedPhotosView({
            theme,
          })}
        >
          <View className="w-full flex-row flex-wrap justify-between p-3">
            <ThemedText>Selected Photos</ThemedText>

            <ThemedText>
              {selectedPhotosToDelete?.length}/{photos?.length}
            </ThemedText>
          </View>
        </Animated.View>
      )}

      <FlatList
        keyExtractor={({ id }) => id.toString()}
        data={photos}
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
        ListEmptyComponent={<EmptyPhotos onTakePhoto={onCameraPermission} />}
      />

      {!!(photos?.length > 0 || hasPhotosSelectedToDelete) && (
        <View
          className={buttonsContainer({
            theme,
          })}
          style={{ bottom: insets?.bottom ?? 0 }}
          onLayout={(e) => {
            setAbsoluteViewHeight(e?.nativeEvent?.layout?.height ?? 0);
          }}
        >
          {hasPhotosSelectedToDelete ? (
            <>
              <Button
                onPress={handleSelectAllPhotos}
                iconName="check"
                size="sm"
                className={button()}
              >
                {translation(
                  "screens.myPhotos.selectedPhotosActions.selectAll",
                )}
              </Button>

              <Button
                onPress={() => setSelectedPhotosToDelete([])}
                iconName="clear"
                size="sm"
                className={button()}
                colorType="secondary"
              >
                {translation(
                  "screens.myPhotos.selectedPhotosActions.clearSelection",
                )}
              </Button>

              <Button
                onPress={deletePhotosConfirmation}
                iconName="delete"
                size="sm"
                className={button({
                  spacing: "noSpacing",
                })}
                colorType="negative"
              >
                {translation(
                  "screens.myPhotos.selectedPhotosActions.deleteSelected",
                )}
              </Button>
            </>
          ) : (
            <Button
              onPress={onCameraPermission}
              iconName="camera"
              className={button({
                spacing: "noSpacing",
              })}
            >
              {translation("screens.myPhotos.hasPhotos.button")}
            </Button>
          )}
        </View>
      )}
    </>
  );
}
