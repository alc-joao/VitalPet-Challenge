import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  createPet,
  deletePet,
  getPetById,
  getPets,
  updatePet,
} from '../services/petService';

import { PetInput } from '../types/Pet';

export function usePets() {
  return useQuery({
    queryKey: ['pets'],
    queryFn: getPets,
  });
}

export function usePet(id: number) {
  return useQuery({
    queryKey: ['pets', id],
    queryFn: () => getPetById(id),
    enabled: id > 0,
  });
}

export function useCreatePet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (pet: PetInput) => createPet(pet),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['pets'],
      });
    },
  });
}

export function useUpdatePet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      pet,
    }: {
      id: number;
      pet: PetInput;
    }) => updatePet(id, pet),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['pets'],
      });

      queryClient.invalidateQueries({
        queryKey: ['pets', variables.id],
      });
    },
  });
}

export function useDeletePet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePet(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['pets'],
      });
    },
  });
}
