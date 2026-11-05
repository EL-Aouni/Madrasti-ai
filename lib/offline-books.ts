import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "madrasti-ai.offline-books";

export async function loadOfflineBooks(): Promise<string[]> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export async function saveOfflineBooks(bookIds: string[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(bookIds));
}
