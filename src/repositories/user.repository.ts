import prisma from "../config/prisma";

class UserRepository {
  async findByCargo(id: number) {
    return await prisma.cargo.findFirst({
      where: { id },
      select: {
        id: true,
        nome: true,
      },
    });
  }
}

export default new UserRepository();
