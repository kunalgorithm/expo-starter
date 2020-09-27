import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    // @ts-ignore
    const { id, username } = jwt.verify(token, process.env.JWT_SECRET!);
    const me = await prisma.user.findOne({ where: { id } });
    res.json(me);
  } else {
    res.json({});
  }
};