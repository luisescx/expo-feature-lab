import { ThemeStates } from "@/stores/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

export enum LocalStorageEnum {
  customTheme = "@expoFeatureLab:customTheme",
  userAuth = "@expoFeatureLab:userAuth",
  language = "@expoFeatureLab:language",
}

interface LocalStorageTypes {
  [LocalStorageEnum.customTheme]: ThemeStates;
  [LocalStorageEnum.userAuth]: boolean;
  [LocalStorageEnum.language]: string;
}

export const LocalStorageService = {
  async get<K extends keyof LocalStorageTypes>(
    storageKey: K,
  ): Promise<LocalStorageTypes[K] | null> {
    try {
      const data = await AsyncStorage.getItem(storageKey);
      return data ? (JSON.parse(data) as LocalStorageTypes[K]) : null;
    } catch (error) {
      console.error(`Failed to retrieve ${storageKey}:`, error);
      return null;
    }
  },

  async set<K extends keyof LocalStorageTypes>(
    storageKey: K,
    value: LocalStorageTypes[K],
  ): Promise<void> {
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to save ${storageKey}:`, error);
    }
  },

  async remove(storageKey: keyof LocalStorageTypes): Promise<void> {
    try {
      await AsyncStorage.removeItem(storageKey);
    } catch (error) {
      console.error(`Failed to remove ${storageKey}:`, error);
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Failed to clear AsyncStorage:", error);
    }
  },
};
