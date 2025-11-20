import { PhotoProps } from "@/app/(app)/my-photos";
import { Image } from "expo-image";
import { Dimensions, Pressable } from "react-native";
import { ThemedText } from "../ui";

const HORIZONTAL_PADDING = 12;
const WIDTH = Dimensions.get("window").width - HORIZONTAL_PADDING * 2;
const PERCENTAGE = (HORIZONTAL_PADDING * 100) / WIDTH;
const WIDTH_TOTAL = (100 - PERCENTAGE) / 2;

export function RenderPhoto({ date, id, uri }: PhotoProps) {
  return (
    <Pressable
      className="active:opacity-60"
      style={{
        width: `${WIDTH_TOTAL}%`,
      }}
    >
      <Image
        source={uri}
        style={{
          width: "100%",
          height: WIDTH / 2,
          borderRadius: 8,
        }}
        contentFit="cover"
        transition={500}
      />

      <ThemedText type="base" className="mt-2 text-center">
        {date}
      </ThemedText>
    </Pressable>
  );
}
