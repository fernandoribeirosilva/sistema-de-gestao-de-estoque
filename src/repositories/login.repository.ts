import prisma from "../config/prisma";

class LoginRepository {
  async existeUsuario(cpf: string) {
    return await prisma.usuario.findFirst({
      where: {
        cpf,
      },
      select: {
        id: true,
        nome: true,
        sobrenome: true,
        cpf: true,
        senha: true,
        Cargo: {
          select: {
            nome: true,
          },
        },
      },
    });
  }
}

export default new LoginRepository();
