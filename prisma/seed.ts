import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const main = async () => {
  const payload = (Date.now() + Math.random()).toString();
  const token = await bcrypt.hash(payload, 10);
  const senha = await bcrypt.hash("123", 10);

  const user = await prisma.usuario.create({
    data: {
      nome: "admin",
      cargo: "admin",
      sexo: "M",
      token,
      senha,
      email: 'admin@admin.com',
    },
  });
};

main();
