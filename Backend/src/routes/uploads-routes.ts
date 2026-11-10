import { Router } from "express";
import multer from "multer";
import { UploadsController } from "@/controllers/uploads-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";
import uploadConfig from "@/configs/upload";

const upload = multer(uploadConfig.MULTER);

const uploadsRoutes = Router();
const uploadsController = new UploadsController();

uploadsRoutes.use(verifyUserAuthorization(["employee", "manager"]));
uploadsRoutes.post("/", upload.single("file"), uploadsController.create);

export { uploadsRoutes };
