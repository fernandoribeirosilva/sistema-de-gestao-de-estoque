import { hash } from "bcrypt";
import { cpf } from "cpf-cnpj-validator";
import validator from "validator";
import UserRepository from "../../../repositories/usuario.repository";

type FuncionarioProps = {
  nome: string;
  sobrenome: string;
  CPF: string;
  telefone: string;
  cargo: string;
  senha: string;
  confirmarSenha: string;
};

export class AtualizarFuncionarioService {
  static async valida(
    usuarioId: number,
    {
      nome,
      sobrenome,
      CPF,
      telefone,
      cargo,
      senha,
      confirmarSenha,
    }: FuncionarioProps
  ) {
    let updates = {} as any;

    if (!nome) {
      throw new Error("nome tem que ter pelomenos 2 caracteres!");
    }
    if (!sobrenome) {
      throw new Error("sobrenome tem que ter pelomenos 2 caracteres!");
    }

    const CPFValido = cpf.isValid(CPF);
    if (!CPF && !CPFValido) {
      console.log(CPFValido);
      throw new Error("CPF inválido.");
    }
    if (!telefone) {
      throw new Error("telefone é obrigatório.");
    }
    if (!cargo) {
      throw new Error("cargo é obrigatório.");
    }
    if (senha !== confirmarSenha) {
      throw new Error("As senhas devem ser iguais.");
    }

    if (nome) {
      updates.nome = nome.toLowerCase();
    }
    if (sobrenome) {
      updates.sobrenome = sobrenome.toLowerCase();
    }
    if (CPF) {
      updates.CPF = CPF;
    }
    if (telefone) {
      const existeTelefone = await UserRepository.buscarTelefone(usuarioId);
      if (existeTelefone) {
        await UserRepository.updateTelefone(telefone, usuarioId);
      }
    }
    if (cargo) {
      updates.cargo = cargo.toLowerCase();
    }

    if (!validator.isEmpty(senha) === !validator.isEmpty(confirmarSenha)) {
      if (senha !== "" && confirmarSenha !== "") {
        updates.novaSenha = await hash(confirmarSenha, 10);
        await UserRepository.updateSenha(updates.novaSenha, usuarioId);
      }
    }

    const up = await UserRepository.update({
      id: usuarioId,
      nome: updates.nome,
      sobrenome: updates.sobrenome,
      cargoNome: updates.cargo,
      CPF: updates.CPF,
    });
  }
}
