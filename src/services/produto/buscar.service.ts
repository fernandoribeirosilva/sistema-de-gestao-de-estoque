import produtoRepository from "../../repositories/produto.repository";

class BuscarProdutoService {
  async index(nome: string) {
    if (!nome) {
      throw new Error("coloque o nome do produto");
    }
    return await produtoRepository.buscarProdutoPeloNome(nome.toLowerCase());
  }

  async buscarPeloId(id: number) {
    const dodosProduto = await produtoRepository.buscarProdutoPeloId(id);
    if (!dodosProduto) {
      throw new Error("Produto não existe!");
    }

    return dodosProduto;
  }
}

export default new BuscarProdutoService();
