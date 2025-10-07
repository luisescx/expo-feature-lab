import { ScrollViewThemed, ThemedText } from "@/components/ui";

export default function ToDoListScreen() {
  return (
    <ScrollViewThemed
      className="items-center justify-center"
      addInsets={["bottom"]}
    >
      <ThemedText>TO DO LIST SCREEN</ThemedText>
    </ScrollViewThemed>
  );
}
