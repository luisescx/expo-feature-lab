import { HomeCard } from "@/components/home";
import { ScrollViewThemed } from "@/components/ui";
import { useTranslation } from "@/hooks/use-translation";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const { navigate } = useRouter();
  const { translation } = useTranslation();

  return (
    <ScrollViewThemed themedSpacing="lg">
      <HomeCard
        title={translation("home.cards.taskList")}
        iconName="unordered-list"
        className="mb-4"
        onPress={() => navigate("/task-list")}
      />
      <HomeCard
        title={translation("home.cards.uploadImage")}
        iconName="camera"
        className="mb-4"
        onPress={() => {
          //
        }}
      />
      <HomeCard
        title={translation("home.cards.map")}
        iconName="environment"
        className="mb-4"
        onPress={() => {
          //
        }}
      />
      <HomeCard
        title={translation("home.cards.animations")}
        iconName="experiment"
        onPress={() => {
          //
        }}
      />
    </ScrollViewThemed>
  );
}
