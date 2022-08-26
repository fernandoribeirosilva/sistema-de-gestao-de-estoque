import { NextFunction, Request, Response } from "express";

export const middlewareGlobal = (req: Request, res: Response, next: NextFunction) => {
  // console.log(req.user)
  res.locals.user = req.session.user;
  next();
}