export type Pet = {
  id: number;
  nome: string;
  especie: string;
  raca: string;
  dataNascimento: string;
  sexo: 'MACHO' | 'FEMEA';
  peso: number;
  observacoes: string | null;
  ativo: boolean;
  dataCadastro: string;
  dataAtualizacao: string;
  tutorId: number;
  tutorNome: string;
  quantidadeConsultas: number;
  quantidadeAlertas: number;
};

export type PetInput = {
  nome: string;
  especie: string;
  raca: string;
  dataNascimento: string;
  sexo: 'MACHO' | 'FEMEA';
  peso: number;
  observacoes?: string;
  tutorId: number;
};

export type PetPage = {
  content: Pet[];
  totalElements: number;
  totalPages: number;
  numberOfElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};
