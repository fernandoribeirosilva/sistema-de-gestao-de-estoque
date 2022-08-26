import prisma from "../config/prisma";


class LoginRepository {
  async existeUsuario(email: string) {
    return await prisma.usuario.findFirst({
      where: {
        email
      },
      select: {
        id: true,
        nome: true,
        sobrenome: true,
        email: true,
        cargo: true,
        senha: true,
        token: true,
      }
    })
  }
}

export default new LoginRepository();