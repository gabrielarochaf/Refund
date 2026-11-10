import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";

const CategoriesEnum = z.enum([
  "food",
  "others",
  "services",
  "transport",
  "accomodation",
]);

class RefundsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(1, { message: "Name is required" }),
      category: CategoriesEnum,
      amount: z
        .number()
        .positive({ message: "Amount must be a positive number" }),
      filename: z.string().trim().min(1, { message: "Filename is required" }),
    });

    const { name, category, amount, filename } = bodySchema.parse(request.body);

    if (!request.user?.id) {
      return response.status(401).json({ message: "User not authenticated" });
    }

    const refund = await prisma.refunds.create({
      data: {
        name,
        category,
        amount,
        filename,
        userId: request.user?.id,
      },
    });

    return response.status(201).json({ refund });
  }

  async index(request: Request, response: Response) {
    const querySchema = z.object({
      name: z.string().optional().default(""),
      page: z.coerce.number().optional().default(1),
      perPage: z.coerce.number().optional().default(10),
    });
    const { name, page, perPage } = querySchema.parse(request.query);
    const refunds = await prisma.refunds.findMany({
      where: {
        user: {
          name: {
            contains: name.trim(),
          },
        },
      },
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: {
        createdAt: "desc",
      },
      include: { user: true },
    });

    //obter o total de registros para paginação
    const totalRefunds = await prisma.refunds.count({
      where: {
        user: {
          name: {
            contains: name.trim(),
          },
        },
      },
    });

    const totalPages = Math.ceil(totalRefunds / perPage);

    response.status(200).json({ refunds, totalPages, totalRefunds });
  }

  async show(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid({ message: "Invalid refund ID" }),
    });

    const { id } = paramsSchema.parse(request.params);

    const refund = await prisma.refunds.findFirst({
      where: { id },
      include: { user: true },
    });

    return response.status(200).json({ refund });
  }
}

export { RefundsController };
