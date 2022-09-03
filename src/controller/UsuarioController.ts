import { Request, Response } from "express";
import { AtualizarFuncionarioService } from "../services/admin/funcionario/atualizar";
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
    if (mensagem) {
      setTimeout(() => {
        mensagem = "";
      }, 1000);
    }
    const { user } = res.locals;
    const { id } = req.params;
    const funcionario = await ListaFuncionario.buscarPeloId(+id);
    // console.log(funcionario);
    res.render("pages/atualizarFuncionario", {
      user,
      ativoMenu: "funcionarios",
      typeError,
      mensagem,
      funcionario,
    });
  }

  async atualizarAction(req: Request, res: Response) {
    try {
      const {
        usuarioId,
        nome,
        sobrenome,
        cpf,
        telefone,
        cargo,
        senha,
        confirmarSenha,
      } = req.body;

      await AtualizarFuncionarioService.valida(+usuarioId, {
        nome,
        sobrenome,
        CPF: cpf,
        telefone,
        cargo,
        senha,
        confirmarSenha,
      });

      typeError = "success";
      mensagem = "Atualização realizado com sucesso.";

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

export { UsuarioController };
