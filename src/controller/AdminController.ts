import { Request, Response } from "express";
import CreateProductService from "../services/admin/novo.produto/create.produto.service";
import { CreateUseService } from "../services/admin/novo.usuario/create.user.service";

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
      const firstName: string = nome.split(" ")[0];
      const lastName: string = nome.split(" ")[1];

      const newUser = new CreateUseService();
      await newUser.execute({
        nome: firstName.toLocaleLowerCase(),
        sobrenome: lastName.toLocaleLowerCase(),
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

  novoProduto(req: Request, res: Response) {
    if (mensagem) {
      setTimeout(() => {
        mensagem = "";
      }, 1000);
    }

    const { user } = res.locals;

    res.render("pages/novoProduto", {
      user,
      ativoMenu: "novo-produto",
      typeError,
      mensagem,
    });
  }

  async novoProdutoAction(req: Request, res: Response) {
    try {
      await CreateProductService.execute(req.body);

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
