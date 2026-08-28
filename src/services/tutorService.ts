import { api } from './api';
import { Tutor } from '../types/Tutor';

type TutorPage = {
  content: Tutor[];
};

function normalizeCpf(cpf: string) {
  return cpf.replace(/\D/g, '');
}

export async function getTutorByCpf(cpf: string): Promise<Tutor | null> {
  const cpfLimpo = normalizeCpf(cpf);

  const response = await api.get<TutorPage>('/api/tutores', {
    params: {
      cpf: cpfLimpo,
    },
  });

  const tutores = response.data.content ?? [];

  if (tutores.length === 0) {
    return null;
  }

  return tutores[0];
}
