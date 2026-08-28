import { api } from './api';
import {
  Tutor,
  TutorInput,
  TutorPage,
} from '../types/Tutor';

function normalizeCpf(cpf: string) {
  return cpf.replace(/\D/g, '');
}

export async function getTutors(): Promise<Tutor[]> {
  const response = await api.get<TutorPage>('/api/tutores');

  return response.data.content.filter(
    (tutor) => tutor.ativo !== false
  );
}

export async function getTutorById(id: number): Promise<Tutor> {
  const response = await api.get<Tutor>(`/api/tutores/${id}`);

  return response.data;
}

export async function getTutorByCpf(
  cpf: string
): Promise<Tutor | null> {
  const cpfLimpo = normalizeCpf(cpf);

  const response = await api.get<TutorPage>('/api/tutores', {
    params: {
      cpf: cpfLimpo,
    },
  });

  const tutores = response.data.content ?? [];

  const tutorAtivo = tutores.find(
    (tutor) => tutor.ativo !== false
  );

  return tutorAtivo ?? null;
}

export async function createTutor(
  tutor: TutorInput
): Promise<Tutor> {
  const response = await api.post<Tutor>(
    '/api/tutores',
    {
      ...tutor,
      cpf: normalizeCpf(tutor.cpf),
    }
  );

  return response.data;
}

export async function updateTutor(
  id: number,
  tutor: TutorInput
): Promise<Tutor> {
  const response = await api.put<Tutor>(
    `/api/tutores/${id}`,
    {
      ...tutor,
      cpf: normalizeCpf(tutor.cpf),
    }
  );

  return response.data;
}

export async function deleteTutor(
  id: number
): Promise<void> {
  await api.delete(`/api/tutores/${id}`);
}
