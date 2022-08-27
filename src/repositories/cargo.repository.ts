import prisma from "../config/prisma";

class CargoRepository {
  async salvar(nome: string) {
    return await prisma.cargo.create({
      data: {
        nome,
      },
    });
  }

  async buscarCargo(nome: string) {
    return await prisma.cargo.findFirst({
      where: {
        nome,
      },
    });
  }
}

export default new CargoRepository();
