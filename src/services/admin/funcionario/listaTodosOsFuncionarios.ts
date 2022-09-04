import UserRepository from "../../../repositories/usuario.repository";

type FuncionarioProps = {
  id: number;
  nome: string;
  sobrenome?: string;
  cargo: string;
  telefone: string;
  cpf?: string;
};

export class ListaFuncionario {
  static async listaTodos(page: number) {
    const funcionarios: FuncionarioProps[] = [];
    const perPage = 5;
    let totalUsuario = 0;
    let user: number[] = [];

    const dadosFuncionarios = await UserRepository.listaTodosOsFuncionarios(
      page,
      perPage
    );
    if (dadosFuncionarios) {
      dadosFuncionarios.forEach((dados) => {
        let telefone = dados.Telefone?.numero ?? "";
        let sobrenome = dados.sobrenome === null ? "" : dados.sobrenome;
        funcionarios.push({
          id: dados.id,
          nome: `${dados.nome} ${sobrenome}`,
          cargo: dados.Cargo.nome,
          telefone,
        });
      });

      const todosOsProdutos = await UserRepository.funcionarios();
      if (todosOsProdutos) {
        todosOsProdutos.forEach(item => {
          user.push(item.id);
        })
      }

      const total = await UserRepository.countTotalFuncionarios(user);
      total.forEach((_, index) => {
        totalUsuario += index;
      });
      
      const pageCount = Math.ceil(totalUsuario / perPage);

      return {
        funcionario: funcionarios, 
        pageCount: pageCount,
        currentPage: page
      };
    }

    return;
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
        cargo: dadosFuncionario.Cargo.nome,
        cpf: dadosFuncionario.cpf,
      };
      return funcionario;
    }
    return;
  }
}
