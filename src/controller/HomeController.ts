import { Request, Response } from "express";
import ProdutoRepository from "../repositories/produto.repository";
import BuscarProdutoService from "../services/produto/produto.service";

let typeError: "error" | "success" | "";
let mensagem: string;
let produto: any;

export default class HomeController {
  async index(req: Request, res: Response) {
    if (mensagem) {
      setTimeout(() => {
        mensagem = "";
      }, 1000);
    }

    const dados = await ProdutoRepository.pegarTodosOsProdutos();
    const todoOsProduto = dados.map((item) => {
      return {
        id: item.id,
        nome: item.nome,
        preco: item.preco.toFixed(2),
        quantidade: item.quantidade,
        lote: item.lote,
        tamanho: item.tamanho,
      };
    });

    const { user } = res.locals;
    res.render("pages/home", {
      user,
      ativoMenu: "estoque",
      typeError,
      mensagem,
      produto,
      todoOsProduto,
    });
    produto = null;
  }

  async pesquisa(req: Request, res: Response) {
    try {
      const { searchTerm } = req.body;

      const dadosProduto = await BuscarProdutoService.index(
        searchTerm as string
      );

      let data = dadosProduto.map((dados) => {
        return {
          id: dados.id,
          nome: dados.nome,
          preco: dados.preco.toFixed(2),
          quantidade: dados.quantidade,
          lote: dados.lote,
          tamanho: dados.tamanho,
        };
      });

      produto = data;

      req.session.save(() => {
        return res.redirect("back");
      });
    } catch (error: InstanceType<Error>) {
      typeError = "error";
      mensagem = error.message;

      req.session.save(() => {
        return res.redirect("back");
      });
      return;
    }
  }
}
