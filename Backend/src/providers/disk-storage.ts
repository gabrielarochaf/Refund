import fs from "node:fs";
import path from "node:path";

import uploadConfig from "../configs/upload";

class DiskStorage {
  async saveFile(file: string) {
    const tmpPath = path.resolve(uploadConfig.TMP_FOLDER, file);
    const destPath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

    try {
      await fs.promises.access(tmpPath);
    } catch (error) {
      console.log(error);
      throw new Error(`File not found: ${tmpPath}`);
    }

    await fs.promises.mkdir(uploadConfig.UPLOADS_FOLDER, { recursive: true }); //Garantee that the destination folder exists, creating it if necessary
    await fs.promises.rename(tmpPath, destPath); //Move the file from the temporary folder to the destination folder

    return file;
  }

  async deleteFile(file: string, type: "tmp" | "uploads") {
    const pathFile =
      type === "tmp" ? uploadConfig.TMP_FOLDER : uploadConfig.UPLOADS_FOLDER;

    const filePath = path.resolve(pathFile, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }
    await fs.promises.unlink(filePath); //Delete the file from the filesystem
  }
}

export { DiskStorage };
