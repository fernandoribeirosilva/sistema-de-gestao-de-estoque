import ProdutoRepository from "../../repositories/produto.repository";

type ProdutoProps = {
  id: number;
  nome: string;
  preco: string;
  quantidade: number;
  lote: string;
  tamanho: string;
};

export class ListaProduto {
  static async listaTodos(page: number) {
    const produtos: ProdutoProps[] = [];
    const perPage = 5;
    let totalProduto = 0;
    let produto: number[] = [];

    const dadosProduto = await ProdutoRepository.pegarTodosOsProdutos(page, perPage);
    if (dadosProduto) {
     dadosProduto.forEach((item) => {
       produtos.push({
         id: item.id,
         nome: item.nome,
         preco: item.preco.toFixed(2),
         quantidade: item.quantidade,
         lote: item.lote,
         tamanho: item.tamanho,
        });
    });

    const todosOsProdutos = await ProdutoRepository.produtos();
    if (todosOsProdutos) {
      todosOsProdutos.forEach((item) => {
        produto.push(item.id);
      })
    }

    const total = await ProdutoRepository.countTotalProdutos(produto);
    total.forEach((_, index) => {
      totalProduto += index;
    });

    const pageCount = Math.ceil(totalProduto / perPage);

    return {
      produto: produtos, 
      pageCount: pageCount,
      currentPage: page
    };
  }
    return;
  }
}

