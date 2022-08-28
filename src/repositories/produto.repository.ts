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
      select: {
        id: true,
        nome: true,
        preco: true,
        quantidade: true,
        lote: true,
        tamanho: true,
      },
    });
  }

  async BuscarProdutoPeloNome(nome: string) {
    return await prisma.produto.findMany({
      where: {
        nome: {
          contains: nome,
        },
      },
    });
  }
}

export default new ProdutoRepository();
