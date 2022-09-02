import { Request, Response } from "express";

let typeError: "error" | "success" | "";
let mensagem: string;

class UsuarioController {
  index(req: Request, res: Response) {
    if (mensagem) {
      setTimeout(() => {
        mensagem = "";
      }, 1000);
    }

    const { user } = res.locals;
    res.render("pages/funcionarios", {
      user,
      ativoMenu: "funcionarios",
      typeError,
      mensagem,
      funcionarios,
    });
  }
}

export { UsuarioController };
