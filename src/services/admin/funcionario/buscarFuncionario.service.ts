import UserRepository from "../../../repositories/usuario.repository";

class BuscarFuncionarioService {
  async index(nome: string) {
    if (!nome) {
      throw new Error("coloque o nome!");
    }
    const produto = await UserRepository.buscarUsuarioPeloNome(
      nome
    );
    if (!produto) return null;
    return produto;
  }
}

export default new BuscarFuncionarioService();
