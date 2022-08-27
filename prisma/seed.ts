import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const main = async () => {
  const senha = await bcrypt.hash("123", 10);

  const user = await prisma.usuario.create({
    data: {
      nome: "admin",
      Cargo: {
        connectOrCreate: {
          where: {
            nome: "gerente",
          },
          create: {
            nome: "gerente",
          },
        },
      },
      senha,
      cpf: "123.222.444-02",
    },
  });

  // await prisma.cargo.create({
  //   data: {
  //     nome: "gerente",
  //   }
  // })
};

main();
