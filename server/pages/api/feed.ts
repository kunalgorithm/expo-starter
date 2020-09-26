import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  const data = await prisma.meditation.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });
  res.json(data);
};
