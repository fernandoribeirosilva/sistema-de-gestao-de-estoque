import { Router } from "express";
import AdminController from "./controller/AdminController";
import HomeController from "./controller/HomeController";
import LoginController from "./controller/LoginController";
import { loginRequired } from "./middlewares/loginRequired";

const router = Router();

router.get("/", loginRequired, new HomeController().index);

router.get("/login", new LoginController().login);
router.get(
  "/registrar-funcionario",
  loginRequired,
  new AdminController().registrarFuncionario
);

router.post(
  "/registrar-funcionario",
  loginRequired,
  new AdminController().registrarFuncionarioAction
);
router.post("/verificarLogin", new LoginController().verificarLogin);

router.get("/sair", new LoginController().logout);

export default router;
