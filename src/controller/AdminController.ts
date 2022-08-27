import { Request, Response } from "express";
import { CreateUseService } from "../services/admin/create.user.service";

let typeError: "error" | "success" | "";
let mensagem: string;

export default class AdminController {
  registrarFuncionario(req: Request, res: Response) {
    if (mensagem) {
      setTimeout(() => {
        mensagem = "";
      }, 1000);
    }

    const { user } = res.locals;

    res.render("pages/registrarFuncionario", {
      user,
      ativoMenu: "registrarFuncionario",
      typeError,
      mensagem,
    });
  }

  async registrarFuncionarioAction(req: Request, res: Response) {
    try {
      const { nome, cpf, telefone, cargo, senha } = req.body;
      const firstName = nome.split(" ")[0];
      const lastName = nome.split(" ")[1];

      const newUser = new CreateUseService();
      await newUser.execute({
        nome: firstName,
        sobrenome: lastName,
        CPF: cpf,
        telefone,
        cargoNome: cargo,
        senha,
      });

      typeError = "success";
      mensagem = "Cadastro realizado com sucesso.";

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
