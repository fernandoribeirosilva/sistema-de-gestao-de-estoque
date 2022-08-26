import { Router } from "express";
import HomeController from "./controller/HomeController";
import LoginController from "./controller/LoginController";
import { loginRequired } from "./middlewares/loginRequired";

const router = Router();

router.get('/', loginRequired, new HomeController().index);

router.get('/login', new LoginController().login);
// router.get('/cadastrar', new LoginController().cadastrar);
// router.get('/logout', new LoginController().logout);

router.post('/verificarLogin', new LoginController().verificarLogin);

export default router;
