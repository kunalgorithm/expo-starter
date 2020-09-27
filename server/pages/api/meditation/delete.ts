import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  const { id } = req.body;

  const data = await prisma.meditation.delete({
    where: { id },
  });

  res.json(data);
  return;
};
