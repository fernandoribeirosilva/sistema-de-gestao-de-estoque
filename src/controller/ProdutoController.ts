import { Request, Response } from "express";
import BuscarProdutoService from "../services/produto/buscar.service";

let typeError: "error" | "success" | "";
let mensagem: string;

export class ProdutoController {
  async index(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const dadoProduto = await BuscarProdutoService.buscarPeloId(parseInt(id));
      const produto = {
        id: dadoProduto.id,
        nome: dadoProduto.nome,
        preco: dadoProduto.preco.toFixed(2),
        tamanho: dadoProduto.tamanho,
      };
      res.status(200).json({ produto });
      return;
    } catch (error: InstanceType<Error>) {}
  }
}
