import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default async (req: any, res: any) => {
  // @ts-ignore
  const { email, password } = req.body;

  const user = await prisma.user.findOne({
    where: { email },
  });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      { email: user.email, id: user.id, time: new Date() },
      process.env.JWT_SECRET!,
      {
        expiresIn: "6h",
      }
    );

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        maxAge: 6 * 60 * 60,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    );

    res.json(user);
  } else {
    res.json({ error: "Incorrect email or password 🙁" });
    return;
  }
};
