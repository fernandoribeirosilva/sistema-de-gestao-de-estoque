export type User = {
  id?: number;
  nome: string;
  sobrenome: string | null;
  telefone?: string;
  CPF: string;
  cargoNome: string;
  senha?: string;
};
