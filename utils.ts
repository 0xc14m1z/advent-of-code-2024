import FileSystem from "node:fs/promises";

export async function readInputFile(path: string): Promise<string> {
  const rawContent = await FileSystem.readFile(path);
  return rawContent.toString();
}
