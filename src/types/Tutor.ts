export type Tutor = {
  id: number;
  nome: string;
  cpf: string;
  email?: string;
  telefone?: string;
  ativo?: boolean;
};

export type TutorInput = {
  nome: string;
  cpf: string;
  email: string;
  telefone?: string;
};

export type TutorPage = {
  content: Tutor[];
  totalElements: number;
  totalPages: number;
  numberOfElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};
