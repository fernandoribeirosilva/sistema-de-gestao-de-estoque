import { Request, Response } from "express";
import { ListaFuncionario } from "../services/admin/funcionario/listaTodosOsFuncionarios";

let typeError: "error" | "success" | "";
let mensagem: string;

class UsuarioController {
  async index(req: Request, res: Response) {
    if (mensagem) {
      setTimeout(() => {
        mensagem = "";
      }, 1000);
    }
    const { user } = res.locals;
    const funcionarios = await ListaFuncionario.listaTodos();

    res.render("pages/funcionarios", {
      user,
      ativoMenu: "funcionarios",
      typeError,
      mensagem,
      funcionarios,
    });
  }

  async atualizar(req: Request, res: Response) {
    const { user } = res.locals;
    const { id } = req.params;
    console.log(id);
    const funcionario = await ListaFuncionario.buscarPeloId(+id);
    res.render("pages/atualizar-funcionarios", {
      user,
      ativoMenu: "funcionarios",
      typeError,
      mensagem,
      funcionario,
    });
  }
}

export { UsuarioController };
