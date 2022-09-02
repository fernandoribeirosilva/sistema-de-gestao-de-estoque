import { Router } from "express";
import AdminController from "./controller/AdminController";
import HomeController from "./controller/HomeController";
import LoginController from "./controller/LoginController";
import { ProdutoController } from "./controller/ProdutoController";
import { UsuarioController } from "./controller/UsuarioController";
import { loginRequired } from "./middlewares/loginRequired";

const router = Router();

router.get("/", loginRequired, new HomeController().index);

router.get("/login", new LoginController().login);
router.get(
  "/registrar-funcionario",
  loginRequired,
  new AdminController().registrarFuncionario
);
router.get("/novo-produto", loginRequired, new AdminController().novoProduto);
router.get("/produto/:id", new ProdutoController().index);
router.get("/funcionarios/", loginRequired, new UsuarioController().index);
router.get(
  "/atualizar/:id/funcionario/",
  loginRequired,
  new UsuarioController().atualizar
);

router.post("/pesquisa", new HomeController().pesquisa);
router.post(
  "/registrar-funcionario",
  loginRequired,
  new AdminController().registrarFuncionarioAction
);
router.post("/verificarLogin", new LoginController().verificarLogin);
router.post("/novo-produto", new AdminController().novoProdutoAction);
router.post("/produto/venda", new ProdutoController().venderProduto);

router.get("/sair", new LoginController().logout);

export default router;
