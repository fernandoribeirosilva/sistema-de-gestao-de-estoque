import { NextFunction, Request, Response } from "express";

export const loginRequired = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user) {
    req.session.save(() => res.redirect('/login'));
    return;
  }
  res.locals.user = req.session.user;
  next();
}