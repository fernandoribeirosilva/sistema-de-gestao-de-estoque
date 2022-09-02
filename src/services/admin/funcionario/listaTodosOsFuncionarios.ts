import UserRepository from "../../../repositories/usuario.repository";

type FuncionarioProps = {
  id: number;
  nome: string;
  sobrenome?: string;
  cargoNome: string;
  telefone: string;
  cpf?: string;
};

export class ListaFuncionario {
  static async listaTodos() {
    const funcionario: FuncionarioProps[] = [];

    const dadosFuncionarios = await UserRepository.listaTodosOsFuncionarios();
    if (dadosFuncionarios) {
      dadosFuncionarios.forEach((dados) => {
        let telefone = dados.Telefone?.numero ?? "";
        let sobrenome = dados.sobrenome === null ? "" : dados.sobrenome;
        funcionario.push({
          id: dados.id,
          nome: `${dados.nome} ${sobrenome}`,
          cargoNome: dados.Cargo.nome,
          telefone,
        });
      });

      return funcionario;
    }

    return [];
  }

  static async buscarPeloId(id: number) {
    let funcionario: FuncionarioProps;
    const dadosFuncionario = await UserRepository.buscarPeloId(id);
    if (dadosFuncionario) {
      let telefone = dadosFuncionario.Telefone?.numero ?? "";
      funcionario = {
        id: dadosFuncionario.id,
        nome: dadosFuncionario.nome,
        sobrenome: dadosFuncionario.sobrenome ?? "",
        telefone,
        cargoNome: dadosFuncionario.Cargo.nome,
        cpf: dadosFuncionario.cpf,
      };
    }
  }
}
