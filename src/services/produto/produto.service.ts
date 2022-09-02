import ProdutoRepository from "../../repositories/produto.repository";
import VendaRepository from "../../repositories/venda.repository";

class ProdutoService {
  async index(nome: string) {
    if (!nome) {
      throw new Error("coloque o nome do produto");
    }
    return await ProdutoRepository.buscarProdutoPeloNome(nome.toLowerCase());
  }

  async buscarPeloId(id: number) {
    const dodosProduto = await ProdutoRepository.buscarProdutoPeloId(id);
    if (!dodosProduto) {
      throw new Error("Produto não existe!");
    }

    return dodosProduto;
  }

  async confirmaVenda(produtoId: number, quantidade: number, userId: number) {
    if (!produtoId) {
      throw new Error("Produto não existe!");
    }
    if (!quantidade) {
      throw new Error("Informe uma quantidade!");
    }

    const produto = new ProdutoService();
    const dadosProduto = await produto.buscarPeloId(produtoId);

    if (quantidade > dadosProduto.quantidade) {
      throw new Error("Este produto não tem, quantidade suficiente.");
    }

    const venda = await VendaRepository.salvar(produtoId, quantidade, userId);
    if (venda) {
      let novaQuantidade = dadosProduto.quantidade - quantidade;
      await ProdutoRepository.atualizarQuantidade(produtoId, novaQuantidade);
      return true;
    }
    return false;
  }
}

export default new ProdutoService();
