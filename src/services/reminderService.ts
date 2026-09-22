import AsyncStorage from '@react-native-async-storage/async-storage';

import { Reminder, ReminderInput } from '../types/Reminder';

import {
  agendarNotificacaoLembrete,
  cancelarNotificacao,
} from './notificationService';

function storageKey(tutorId: number): string {
  if (!Number.isInteger(tutorId) || tutorId <= 0) {
    throw new Error('Identificador do tutor inválido.');
  }

  return `@vitalpet:reminders:${tutorId}`;
}

export async function listarLembretes(
  tutorId: number
): Promise<Reminder[]> {
  const salvo = await AsyncStorage.getItem(storageKey(tutorId));

  if (!salvo) {
    return [];
  }

  const lembretes: Reminder[] = JSON.parse(salvo);

  if (!Array.isArray(lembretes)) {
    throw new Error('Os lembretes salvos são inválidos.');
  }

  return lembretes
    .filter(item => item.tutorId === tutorId)
    .sort(
      (a, b) =>
        new Date(a.data).getTime() -
        new Date(b.data).getTime()
    );
}

export async function criarLembrete(
  input: ReminderInput
): Promise<Reminder> {
  const titulo = input.titulo.trim();
  const petNome = input.petNome.trim();
  const data = new Date(input.data);

  if (!titulo || !petNome) {
    throw new Error('Informe o título e o pet do lembrete.');
  }

  if (
    !Number.isInteger(input.petId) ||
    input.petId <= 0 ||
    !Number.isFinite(data.getTime()) ||
    data.getTime() <= Date.now()
  ) {
    throw new Error('Informe um pet e uma data futura válida.');
  }

  const lembretes = await listarLembretes(input.tutorId);

  let notificationId: string | null = null;

  try {
    notificationId = await agendarNotificacaoLembrete(
      `Lembrete: ${titulo}`,
      `Está na hora de cuidar de ${petNome}.`,
      data,
      input.petId
    );
  } catch (error) {
    console.warn(
      'Lembrete será salvo sem notificação agendada:',
      error
    );
  }

  const lembrete: Reminder = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    tutorId: input.tutorId,
    petId: input.petId,
    petNome,
    titulo,
    data: data.toISOString(),
    notificationId,
    criadoEm: new Date().toISOString(),
  };

  try {
    await AsyncStorage.setItem(
      storageKey(input.tutorId),
      JSON.stringify([...lembretes, lembrete])
    );
  } catch (error) {
    if (notificationId) {
      await cancelarNotificacao(notificationId);
    }
    throw error;
  }

  return lembrete;
}

export async function excluirLembrete(
  tutorId: number,
  lembreteId: string
): Promise<void> {
  const lembretes = await listarLembretes(tutorId);

  const lembrete = lembretes.find(item => item.id === lembreteId);

  if (!lembrete) {
    throw new Error('Lembrete não encontrado.');
  }

  if (lembrete.notificationId) {
    await cancelarNotificacao(lembrete.notificationId);
  }

  await AsyncStorage.setItem(
    storageKey(tutorId),
    JSON.stringify(
      lembretes.filter(item => item.id !== lembreteId)
    )
  );
}
