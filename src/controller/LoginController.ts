import { Request, Response } from "express";
import { LoginService } from "../services/login/login.service";

let typeError: "error" | "success" | "";
let mensagem: string;

export default class LoginController {
  login(req: Request, res: Response) {
    if (mensagem) {
      setTimeout(() => {
        mensagem = "";
      }, 1000);
    }

    res.render('pages/login', {
      title: 'Login',
      type: 'verificarLogin',
      textButton: 'Entra',
      typeError,
      mensagem
    })
  }

  async verificarLogin(req: Request, res: Response) {
    try {
      const login = new LoginService();
      const user = await login.verificarLogin(req.body);

      req.session.user = user;
      req.session.save(() => {
        return res.redirect('/');
      })

    } catch (error: InstanceType<Error>) {
      typeError = "error";
      mensagem = error.message;

      req.session.save(() => {
        return res.redirect('back');
      });
      return;
    }
  }
}