import prisma from "../config/prisma";
import { User } from "../types/User";

class UserRepository {
  async salvar({ id, nome, sobrenome, CPF, telefone, senha, cargoNome }: User) {
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
        Telefone: {
          create: {
            numero: telefone as string,
          }
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

  async update({ id, nome, sobrenome, CPF, cargoNome }: User) {
    return await prisma.usuario.update({
      where: {
        id,
      },
      data: {
        nome,
        sobrenome,
        cpf: CPF,
        Cargo: {
          connectOrCreate: {
            where: { nome: cargoNome },
            create: { nome: cargoNome },
          },
        },
      },
    });
  }

  async updateSenha(senha: string, id: number) {
    return await prisma.usuario.update({
      where: {
        id,
      },
      data: {
        senha,
      },
    });
  }

  async updateTelefone(telefone: string, id: number) {
    return await prisma.telefone.update({
      where: {
        usuario_id: id,
      },
      data: {
        numero: telefone,
      },
    });
  }

  async criarTelefone(telefone: string, usuario_id: number) {
    return await prisma.telefone.create({
      data: {
        numero: telefone,
        Usuario: {
          connect: {
            id: usuario_id,
          },
        },
      },
    });
  }

  async buscarTelefone(id: number) {
    return await prisma.telefone.findFirst({
      where: {
        usuario_id: {
          equals: id,
        },
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

  async buscarUsuarioPeloNome(nome: string) {
    return await prisma.usuario.findMany({
      where: {
        nome: {
          contains: nome,
          mode: "insensitive"
        },
      },
      select: {
        id: true,
        nome: true,
        sobrenome: true,
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

  async funcionarios() {
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
        nome: "asc",
      },
    })
  }

  async listaTodosOsFuncionarios(page: number, perPage: number) {
    return await prisma.usuario.findMany({
      skip: page, // vai pular ate a pagina
      take: perPage, // vai mostrar o tanto de posts que foi passado para perPage
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

  async countTotalFuncionarios(usuario: number[] | number) {
    return await prisma.usuario.findMany({
      where: {
        id: {
          in: usuario,
        },
      }
    });
  }
}

export default new UserRepository();
