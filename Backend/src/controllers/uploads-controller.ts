import { Request, Response } from "express";
import z from "zod";
import uploadConfig from "@/configs/upload";
import { DiskStorage } from "@/providers/disk-storage";
import { AppError } from "@/utils/AppError";

class UploadsController {
  async create(request: Request, response: Response) {
    const diskStorage = new DiskStorage();

    try {
      const fileScheme = z
        .object({
          filename: z.string().min(1, {
            message: "Filename is required",
          }),
          mimetype: z
            .string()
            .refine(
              (type) => uploadConfig.ACCEPTED_IMAGE_TYPES.includes(type),
              `Invalid file type. Accepted types are: ${uploadConfig.ACCEPTED_IMAGE_TYPES}`,
            ),
          size: z
            .number()
            .positive()
            .refine(
              (size) => uploadConfig.MAX_FILE_SIZE >= size,
              `File size exceeds the maximum limit of ${uploadConfig.MAX_FILE_SIZE} bytes`,
            ),
        })
        .passthrough();

      const file = fileScheme.parse(request.file);
      const filename = await diskStorage.saveFile(file.filename);

      response.json({ message: "ok", filename });
    } catch (error) {
      if (error instanceof z.ZodError) {
        if (request.file) {
          await diskStorage.deleteFile(request.file.filename, "tmp");
        }

        throw new AppError(error.issues[0].message);
      }

      throw error;
    }
  }
}

export { UploadsController };
