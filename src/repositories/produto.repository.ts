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
}

export default new ProdutoRepository();
