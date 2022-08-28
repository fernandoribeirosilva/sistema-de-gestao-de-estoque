import produtoRepository from "../../repositories/produto.repository";

class BuscarProdutoService {
  async index(nome: string) {
    if (!nome) {
      throw new Error("coloque o nome do produto");
    }

    return await produtoRepository.BuscarProdutoPeloNome(nome.toLowerCase());
  }
}

export default new BuscarProdutoService();
