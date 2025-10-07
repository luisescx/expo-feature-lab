import {
  Button,
  ScrollViewThemed,
  ThemedText,
  ThemeToggle,
} from "@/components/ui";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const { navigate } = useRouter();

  return (
    <ScrollViewThemed className="items-center justify-center">
      <ThemedText>Home</ThemedText>

      <ThemeToggle />

      <Button onPress={() => navigate("/to-do-list")}>To do</Button>
    </ScrollViewThemed>
  );
}
