import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const main = async () => {
  const senha = await bcrypt.hash("SENHA", 10);

  const user = await prisma.usuario.create({
    data: {
      nome: "COLOQUE AQUI O NOME DO ADMIN",
      Cargo: {
        connectOrCreate: {
          where: {
            nome: "COLOQUE AQUI O NOME DO CARGO",
          },
          create: {
            nome: "COLOQUE AQUI O NOME DO CARGO",
          },
        },
      },
      senha,
      cpf: "COLOQUE AQUI O CPF",
    },
  });
};

main();
