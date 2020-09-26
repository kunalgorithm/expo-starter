import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
export default async (req, res) => {
  const prisma = new PrismaClient();

  const { token } = req.cookies;

  if (token) {
    // Get authenticated user
    //@ts-ignore
    const { _id, username } = jwt.verify(token, process.env.JWT_SECRET!);
    const { duration, notes } = req.body;

    const data = await prisma.meditation.create({
      data: { duration, notes, user: { connect: { username } } },
    });
    res.json(data);
  } else {
    res.json({ error: "You must be logged in to tweet." });
  }
};
