import express from "express";
import "express-async-errors";
import cors from "cors";
import { errorHandler } from "@/middlewares/error-handeling";
import { z } from "zod";
import { routes } from "./routes";
import uploadConfig from "@/configs/upload";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(uploadConfig.UPLOADS_FOLDER));
app.use(routes);

app.get("/", (req, res) => {
  const bodySchema = z.object({
    age: z.number().min(18),
  });

  const { age } = bodySchema.parse(req.body);

  res.send("Hello, World!");
});

app.use(errorHandler);

export { app };

//Cors - Cross -Origin Resource Sharing -
// Para o front-end acessar a API, é necessário liberar o acesso.
// O CORS é uma política de segurança que restringe o acesso a
// recursos em um servidor a partir de domínios diferentes.
// Para permitir que o front-end acesse a API, é necessário configurar
// o CORS no servidor.
