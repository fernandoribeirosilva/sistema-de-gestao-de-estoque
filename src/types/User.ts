export type User = {
  id: number;
  nome: string;
  sobrenome: string | null;
  cpf: string;
  Cargo: {
    nome: string;
  };
  senha?: string;
};
