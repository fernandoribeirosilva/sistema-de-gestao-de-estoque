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

  async produtos() {
    return await prisma.produto.findMany({
      select: {
        id: true,
        nome: true,
        lote: true,
        preco: true,
        quantidade: true,
        tamanho: true,
      },
    });
  }

  async pegarTodosOsProdutos(page: number, perPage: number) {
    return await prisma.produto.findMany({
      skip: page, // vai pular ate a pagina
      take: perPage, // vai mostrar o tanto de posts que foi passado para perPage
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
          mode: "insensitive",
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

  async countTotalProdutos(produto: number[] | number) {
    return await prisma.produto.findMany({
      where: {
        id: {
          in: produto,
        },
      },
    });
  }
}

export default new ProdutoRepository();
