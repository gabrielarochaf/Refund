import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "@/database/prisma";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { authConfig } from "@/configs/auth";

class SessionsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().nonempty(),
    });

    const { email, password } = bodySchema.parse(request.body);

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return response.status(400).json({
        message: "User or password is incorrect",
      });
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return response.status(400).json({
        message: "User or password is incorrect",
      });
    }

    const secret = authConfig.jwt.secret;

    if (!secret) {
      throw new Error("JWT_SECRET is not configured");
    }

    // const token = jwt.sign({ sub: user.id }, secret, { expiresIn: "1d" });
    const token = jwt.sign({ role: user.role }, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    const { password: _, ...userWithoutPassword } = user;

    return response.json({ token, user: userWithoutPassword });
  }
}

export { SessionsController };
