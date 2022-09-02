import { Request, Response } from "express";
import ProdutoService from "../services/produto/produto.service";

let typeError: "error" | "success" | "";
let mensagem: string;

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
      const { produtoId, quantidade } = req.body;

      const userId = +user.id;
      const dadoProduto = await ProdutoService.confirmaVenda(
        produtoId,
        quantidade,
        userId
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
}
