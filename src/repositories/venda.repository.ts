import { Venda } from "@prisma/client";
import prisma from "../config/prisma";

class VendaRepository {
  async salvar(
    produtoId: number,
    quantidade: number,
    userId: number,
    preco: number
  ) {
    return await prisma.venda.create({
      data: {
        qtd_vendida: quantidade,
        preco_produto: preco,
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

  async relatorioPelaData(dataInicio: Date, dataFim: Date) {
    return await prisma.$queryRaw<Venda[]>`
      SELECT *
      FROM venda
      WHERE data_venda 
      BETWEEN ${dataInicio} AND ${dataFim}
      ORDER BY qtd_vendida DESC;
    `;
  }

  async todasAsVendas() {
    return await prisma.venda.findMany({
      select: {
        id: true,
        produto_id: true,
        usuario_id: true,
        preco_produto: true,
        qtd_vendida: true,
      },
    });
  }

  async countTotalVendas(produto: number[] | number) {
    return await prisma.venda.count({
      where: {
        id: {
          in: produto,
        },
      },
      select: {
        _all: true,
      },
    });
  }

  async relatorioDeMaisVendido() {
    return await prisma.venda.findMany({
      select: {
        id: true,
        produto: {
          select: {
            nome: true,
          },
        },
        preco_produto: true,
        qtd_vendida: true,
      },
      orderBy: {
        qtd_vendida: "desc",
      },
    });
  }

  async buscarProdutoPeloId(id: number) {
    return await prisma.produto.findMany({
      where: {
        id,
      },
      select: {
        id: true,
        nome: true,
        preco: true,
        tamanho: true,
        quantidade: true,
      },
    });
  }
}

export default new VendaRepository();
