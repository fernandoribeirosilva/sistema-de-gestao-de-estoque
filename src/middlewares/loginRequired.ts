import { NextFunction, Request, Response } from "express";

export const loginRequired = (req: Request, res: Response, next: NextFunction) => {
  // console.log(req.session)
  if (!req.session.user) {
    req.session.save(() => res.redirect('/login'));
    return;
  }
  next();
}