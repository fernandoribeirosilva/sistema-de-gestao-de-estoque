import { Request, Response } from "express";
import ProdutoService from "../services/produto/produto.service";
import RelatorioService from "../services/produto/relatorio.service";

let typeError: "error" | "success" | "";
let mensagem: string;
let produto: any;

export class ProdutoController {
  async index(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const dadoProduto = await ProdutoService.buscarPeloId(parseInt(id));
      const produto = {
        id: dadoProduto.id,
        nome: dadoProduto.nome,
        preco: dadoProduto.preco.toFixed(2),
        tamanho: dadoProduto.tamanho,
      };

      res.status(200).json({ produto });
      return;
    } catch (error: InstanceType<Error>) {
      console.log(error.message);
      res.status(401).json({ error: error.message });
      return;
    }
  }

  async venderProduto(req: Request, res: Response) {
    try {
      const user = res.locals.user;
      const { produtoId, quantidade, preco } = req.body;

      const userId = +user.id;
      const dadoProduto = await ProdutoService.confirmaVenda(
        produtoId,
        quantidade,
        userId,
        preco
      );

      if (!dadoProduto) {
        throw new Error("Não foi possível efetua a venda.");
      }

      res.status(201).json({ msg: "Venda realizada com sucesso." });
      return;
    } catch (error: InstanceType<Error>) {
      res.status(401).json({ error: error.message });
      return;
    }
  }

  async relatorio(req: Request, res: Response) {
    if (mensagem) {
      setTimeout(() => {
        mensagem = "";
      }, 1000);
    }
    const { user } = res.locals;
    const produtos = await RelatorioService.buscarDadosProduto();
    // console.log(produtos);

    res.render("pages/relatorio", {
      user,
      ativoMenu: "relatorio",
      typeError,
      mensagem,
      produtos: produto ?? produtos,
    });
    produto = null;
  }

  async relatorioAction(req: Request, res: Response) {
    try {
      const { dateInicio, dateFim } = req.body;

      const dadosProduto = await RelatorioService.buscarDadosProdutoPelaData(
        dateInicio,
        dateFim
      );

      produto = dadosProduto;

      req.session.save(() => {
        return res.redirect("back");
      });
    } catch (error: InstanceType<Error>) {
      typeError = "error";
      mensagem = error.message;
      console.log("r", error.message);

      req.session.save(() => {
        return res.redirect("back");
      });
      return;
    }
  }
}
