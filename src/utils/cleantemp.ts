import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const tempFolderPath = path.join(__dirname, "temp");

export const cleanupTempFolder = async () => {
  try {
    const exists = await fs.pathExists(tempFolderPath);
    if (!exists) return;

    const files = await fs.readdir(tempFolderPath);
    await Promise.all(
      files.map((file) => fs.remove(path.join(tempFolderPath, file)))
    );

    console.log("🧹 Temp folder cleaned up successfully.");
  } catch (error) {
    console.error("❌ Error cleaning up temp folder:", error);
  }
};
