import bcrypt from 'bcrypt';
import LoginRepository from "../../repositories/login.repository";
import { LoginType } from "../../types/Login";
import { User } from '../../types/User';

export class LoginService {
  // protected body: LoginType;
  protected error: string;
  protected user: User | null;

  constructor() {
    this.error = '';
    this.user = null;
  }

  async verificarLogin(body: LoginType): Promise<User> {
    const { email, senha } = body;

    this.user = await LoginRepository.existeUsuario(email);
    if (!this.user) {
      throw new Error('Email e/ou senha esta errador!');
    }

    const matchSenha = await bcrypt.compare(senha, this.user.senha);
    if (!matchSenha) {
      throw new Error('Email e/ou senha esta errador!');
    }

    return this.user;
  }

}