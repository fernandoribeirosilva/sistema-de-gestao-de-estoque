import { Request, Response } from "express";

export default class AdminController {
  registrarFuncionario(req: Request, res: Response) {
    const { user } = res.locals;

    res.render("pages/registrarFuncionario", {
      user,
      ativoMenu: "registrarFuncionario",
    });
  }
}
