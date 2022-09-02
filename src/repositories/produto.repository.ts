import prisma from "../config/prisma";
import { Produto } from "../types/Produto";

class ProdutoRepository {
  async salvar({ nome, preco, quantidade, lote, tamanho }: Produto) {
    return await prisma.produto.create({
      data: {
        nome,
        preco: parseFloat(preco),
        quantidade,
        lote,
        tamanho,
      },
    });
  }

  async pegarTodosOsProdutos() {
    return await prisma.produto.findMany({
      where: {
        quantidade: {
          gt: 0,
        },
      },
      select: {
        id: true,
        nome: true,
        preco: true,
        quantidade: true,
        lote: true,
        tamanho: true,
      },
      orderBy: {
        id: "asc",
      },
    });
  }

  async buscarProdutoPeloNome(nome: string) {
    return await prisma.produto.findMany({
      where: {
        nome: {
          contains: nome,
        },
      },
    });
  }

  async buscarProdutoPeloId(id: number) {
    return await prisma.produto.findUnique({
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

  async atualizarQuantidade(produtoId: number, quantidade: number) {
    return await prisma.produto.updateMany({
      where: { id: produtoId },
      data: {
        quantidade,
      },
    });
  }
}

export default new ProdutoRepository();
