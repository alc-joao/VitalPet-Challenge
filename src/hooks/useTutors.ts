import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  createTutor,
  deleteTutor,
  getTutorById,
  getTutors,
  updateTutor,
} from '../services/tutorService';

import { TutorInput } from '../types/Tutor';

export function useTutors() {
  return useQuery({
    queryKey: ['tutores'],
    queryFn: getTutors,
  });
}

export function useTutor(id: number) {
  return useQuery({
    queryKey: ['tutores', id],
    queryFn: () => getTutorById(id),
    enabled: id > 0,
  });
}

export function useCreateTutor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tutor: TutorInput) =>
      createTutor(tutor),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tutores'],
      });
    },
  });
}

export function useUpdateTutor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      tutor,
    }: {
      id: number;
      tutor: TutorInput;
    }) => updateTutor(id, tutor),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['tutores'],
      });

      queryClient.invalidateQueries({
        queryKey: ['tutores', variables.id],
      });
    },
  });
}

export function useDeleteTutor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      deleteTutor(id),

    onSuccess: (_data, id) => {
      queryClient.removeQueries({
        queryKey: ['tutores', id],
      });

      queryClient.invalidateQueries({
        queryKey: ['tutores'],
      });
    },
  });
}
