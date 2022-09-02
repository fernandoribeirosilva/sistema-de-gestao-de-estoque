import prisma from "../config/prisma";

class VendaRepository {
  async salvar(produtoId: number, quantidade: number, userId: number) {
    return await prisma.venda.create({
      data: {
        qtd_vendida: quantidade,
        usuario: {
          connect: {
            id: userId,
          },
        },
        produto: {
          connect: {
            id: produtoId,
          },
        },
      },
    });
  }
}

export default new VendaRepository();
