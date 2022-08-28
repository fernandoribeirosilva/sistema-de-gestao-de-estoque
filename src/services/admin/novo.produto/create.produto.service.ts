import ProdutoRepository from "../../../repositories/produto.repository";
import { Produto } from "../../../types/Produto";

class CreateProductService {
  async execute(data: Produto) {
    if (!data.nome) {
      throw new Error("nome é obrigatório.");
    }
    if (!data.preco) {
      throw new Error("preco é obrigatório.");
    }
    if (!data.quantidade) {
      throw new Error("quantidade é obrigatório.");
    }
    if (!data.lote) {
      throw new Error("lote é obrigatório.");
    }
    if (!data.tamanho) {
      throw new Error("tamanho é obrigatório.");
    }

    let preco = parseFloat(data.preco.replace(",", ".")).toFixed(2);
    const newProduto = await ProdutoRepository.salvar({
      nome: data.nome,
      preco,
      quantidade: +data.quantidade,
      lote: data.lote,
      tamanho: data.tamanho,
    });
    if (!newProduto) {
      throw new Error("Não foi possível cadastra o produto.");
    }
  }
}

export default new CreateProductService();
