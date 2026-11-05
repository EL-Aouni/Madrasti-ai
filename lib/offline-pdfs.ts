import * as FileSystem from "expo-file-system/legacy";

export async function downloadAuthorizedPdf(url: string, filename: string, authorizationGranted: boolean): Promise<string> {
  if (!authorizationGranted) {
    throw new Error("This PDF is not marked as authorized for distribution.");
  }
  if (!url.startsWith("https://")) {
    throw new Error("Only secure HTTPS PDF sources are allowed.");
  }
  const safeFilename = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const target = `${FileSystem.documentDirectory ?? FileSystem.cacheDirectory}${safeFilename}`;
  const existing = await FileSystem.getInfoAsync(target);
  if (existing.exists) return target;
  const result = await FileSystem.downloadAsync(url, target);
  return result.uri;
}
