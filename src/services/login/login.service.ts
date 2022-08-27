import bcrypt from "bcrypt";
import LoginRepository from "../../repositories/login.repository";
import { LoginType } from "../../types/Login";
import { User } from "../../types/User";

export class LoginService {
  async verificarLogin(body: LoginType): Promise<User | null> {
    const { cpf, senha } = body;

    const user = await LoginRepository.existeUsuario(cpf);
    if (!user) {
      throw new Error("CPF e/ou senha esta errador!");
    }

    const matchSenha = await bcrypt.compare(senha, user.senha);
    if (!matchSenha) {
      throw new Error("CPF e/ou senha esta errador!");
    }

    return user;
  }
}
