import { ScrollViewThemed, ThemedText, ThemeToggle } from "@/components/ui";

export default function ProfileScreen() {
  return (
    <ScrollViewThemed className="items-center justify-center">
      <ThemedText>Profile</ThemedText>

      <ThemeToggle />
    </ScrollViewThemed>
  );
}
