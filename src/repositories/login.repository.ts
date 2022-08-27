import prisma from "../config/prisma";

class LoginRepository {
  async existeUsuario(cpf: string) {
    return await prisma.usuario.findFirst({
      where: {
        cpf,
      },
    });
  }
}

export default new LoginRepository();
