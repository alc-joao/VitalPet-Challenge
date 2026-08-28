import { api } from './api';
import { Pet, PetInput, PetPage } from '../types/Pet';

export async function getPets(tutorId?: number): Promise<Pet[]> {
  const response = await api.get<PetPage>('/api/pets', {
    params: tutorId ? { tutorId } : undefined,
  });

  return response.data.content.filter((pet) => pet.ativo);
}

export async function getPetById(id: number): Promise<Pet> {
  const response = await api.get<Pet>(`/api/pets/${id}`);
  return response.data;
}

export async function createPet(pet: PetInput): Promise<Pet> {
  const response = await api.post<Pet>('/api/pets', pet);
  return response.data;
}

export async function updatePet(id: number, pet: PetInput): Promise<Pet> {
  const response = await api.put<Pet>(`/api/pets/${id}`, pet);
  return response.data;
}

export async function deletePet(id: number): Promise<void> {
  await api.delete(`/api/pets/${id}`);
}
