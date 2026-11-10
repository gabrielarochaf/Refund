import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";

//const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const TMP_FOLDER = path.resolve(process.cwd(), "tmp"); //Vai para pasta temporária para que esse arquivo possa ser validado em sua externsão, por exemplo
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");

//1KB = 1024 bytes, 1MB = 1024KB (1024 * 1024 bytes), 1GB = 1024MB (1024 * 1024 * 1024 bytes)
const MAX_SIZE = 3; // 3MB
const MAX_FILE_SIZE = MAX_SIZE * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename: (req, file, cb) => {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`; //Esse hash é para evitar que arquivos com o mesmo nome sejam sobrescritos, por exemplo, se duas pessoas fizerem upload de um arquivo chamado "foto.jpg", o hash vai gerar nomes diferentes para cada arquivo.
      return cb(null, fileName);
    },
  }),
};

export default {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
  MULTER,
  MAX_SIZE,
};
