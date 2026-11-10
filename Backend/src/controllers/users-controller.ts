import { Request, Response } from "express";
import { z } from "zod";
import { UserRole } from "@prisma/client";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { hash } from "bcrypt";

class UsersController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z
        .string()
        .trim()
        .min(2, { message: "Name must be at least 2 characters long" }),
      email: z
        .string()
        .email({ message: "Invalid email address" })
        .toLowerCase(),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" }),
      role: z
        .enum([UserRole.employee, UserRole.manager])
        .default(UserRole.employee),
    });
    const { name, email, password, role } = bodySchema.parse(request.body);

    const userWithSameEmail = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userWithSameEmail) {
      throw new AppError("User with this email already exists");
    }

    const hashedPassword = await hash(password, 8);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });
    return response.status(201).json({ message: "User created successfully" });
  }
}

export { UsersController };
