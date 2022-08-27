import { Request, Response } from "express";

export default class HomeController {
  index(req: Request, res: Response) {
    const { user } = res.locals;
    res.render('pages/home', {
      user,
      ativoMenu: "home"
    })
  }
}