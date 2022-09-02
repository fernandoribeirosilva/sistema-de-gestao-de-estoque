import prisma from "../config/prisma";
import { User } from "../types/User";

class UserRepository {
  async salvar({ nome, sobrenome, CPF, telefone, senha, cargoNome }: User) {
    return await prisma.usuario.create({
      data: {
        nome,
        sobrenome,
        cpf: CPF,
        senha: senha as string,
        Cargo: {
          connectOrCreate: {
            where: { nome: cargoNome },
            create: { nome: cargoNome },
          },
        },
      },
      select: {
        nome: true,
        sobrenome: true,
        cpf: true,
        cargo_id: true,
      },
    });
  }

  async buscarPeloId(id: number) {
    return await prisma.usuario.findFirst({
      where: { id },
      select: {
        id: true,
        nome: true,
        sobrenome: true,
        cpf: true,
        Telefone: {
          select: {
            numero: true,
          },
        },
        Cargo: {
          select: {
            nome: true,
          },
        },
      },
    });
  }

  async buscaCargo(id: number) {
    return await prisma.cargo.findFirst({
      where: { id },
      select: {
        id: true,
        nome: true,
      },
    });
  }

  async buscarCPF(cpf: string) {
    return await prisma.usuario.findFirst({
      where: { cpf },
      select: {
        cpf: true,
      },
    });
  }

  async listaTodosOsFuncionarios() {
    return await prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        sobrenome: true,
        Cargo: {
          select: {
            nome: true,
          },
        },
        Telefone: {
          select: {
            numero: true,
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });
  }
}

export default new UserRepository();
