import bcrypt from "bcrypt";
import { cpf } from "cpf-cnpj-validator";
import validator from "validator";
import UserRepository from "../../../repositories/usuario.repository";
import { User } from "../../../types/User";

class CreateUseService {
  async execute({ nome, sobrenome, CPF, telefone, senha, cargoNome }: User) {
    if (!nome) {
      throw new Error("nome é obrigatório.");
    }

    const CPFValido = cpf.isValid(CPF);
    if (!CPF && !CPFValido) {
      console.log(CPFValido);
      throw new Error("CPF inválido.");
    }

    const existeCPF = await UserRepository.buscarCPF(CPF);
    if (existeCPF) {
      throw new Error("CPF já existe.");
    }

    if (!telefone) {
      throw new Error("telefone é obrigatório.");
    }

    if (!cargoNome) {
      throw new Error("cargo é obrigatório.");
    }

    if (!senha && !validator.isLength(senha as string, { min: 2 })) {
      throw new Error("senha deve ter 2 caracteres.");
    }

    const senhaHash = await bcrypt.hash(String(senha), 10);
    const newUser = await UserRepository.salvar({
      nome,
      sobrenome,
      CPF,
      telefone,
      senha: senhaHash,
      cargoNome,
    });
  }
}

export { CreateUseService };
