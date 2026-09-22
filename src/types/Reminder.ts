export type Reminder = {
  id: string;
  tutorId: number;
  petId: number;
  petNome: string;
  titulo: string;
  data: string;
  notificationId: string | null;
  criadoEm: string;
};

export type ReminderInput = Pick<
  Reminder,
  'tutorId' | 'petId' | 'petNome' | 'titulo' | 'data'
>;
