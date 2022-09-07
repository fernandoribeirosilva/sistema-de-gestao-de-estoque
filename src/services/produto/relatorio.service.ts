import VendaRepository from "../../repositories/venda.repository";

type VendaProps = {
  id: number;
  qtd_vendida: number;
  preco: string;
  total_venda: string;
  produto: string[] | string;
};

class RelatorioService {
  async buscarDadosProdutoPelaData(dataInicio: string, dataFim: string) {
    console.log("d2", dataInicio, dataFim);
    if (!dataInicio.length && !dataFim.length) {
      throw new Error("Coloque as datas");
    }
    let dateStart = new Date(dataInicio);
    let dateEnd = new Date(dataFim);

    const existeVenda = await VendaRepository.relatorioPelaData(
      dateStart,
      dateEnd
    );

    if (!existeVenda.length) {
      throw new Error("Não foi encontrado resultado para estas datas!");
    }

    let venda: VendaProps[] = [];
    existeVenda.forEach(async (item) => {
      const produto = await VendaRepository.buscarProdutoPeloId(
        item.produto_id
      );
      const nomeProduto = produto.map((item) => {
        return item.nome;
      });
      venda.push({
        id: item.id,
        qtd_vendida: item.qtd_vendida,
        preco: item.preco_produto.toFixed(2),
        total_venda: (item.preco_produto * item.qtd_vendida).toFixed(2),
        produto: nomeProduto,
      });
    });

    return venda;
  }

  async buscarDadosProduto() {
    let venda: VendaProps[] = [];

    const dadosVenda = await VendaRepository.relatorioDeMaisVendido();
    if (!dadosVenda) {
      throw new Error("Não tem vendas!");
    }

    dadosVenda.map((item) => {
      venda.push({
        id: item.id,
        qtd_vendida: item.qtd_vendida,
        preco: item.preco_produto.toFixed(2),
        total_venda: (item.preco_produto * item.qtd_vendida).toFixed(2),
        produto: item.produto.nome,
      });
    });

    return {
      venda: venda,
    };
  }
}

export default new RelatorioService();
