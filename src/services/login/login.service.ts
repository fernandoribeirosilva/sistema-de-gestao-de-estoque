import bcrypt from "bcrypt";
import LoginRepository from "../../repositories/login.repository";
import { LoginType } from "../../types/Login";
import { User } from "../../types/User";

export class LoginService {
  async verificarLogin(body: LoginType): Promise<User> {
    const { cpf, senha } = body;

    const dataUser = await LoginRepository.existeUsuario(cpf);
    if (!dataUser) {
      throw new Error("CPF e/ou senha esta errador!");
    }

    const matchSenha = await bcrypt.compare(senha, dataUser.senha);
    if (!matchSenha) {
      throw new Error("CPF e/ou senha esta errador!");
    }

    return dataUser;
  }
}
