import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Exibe notificações recebidas com o aplicativo aberto.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function solicitarPermissaoNotificacoes(): Promise<boolean> {
  if (Platform.OS === 'web') {
    return false;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('lembretes', {
      name: 'Lembretes do VitalPet',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#0A66C2',
    });
  }

  const permissaoAtual =
    await Notifications.getPermissionsAsync();

  let status = permissaoAtual.status;

  if (status !== 'granted') {
    const resultado =
      await Notifications.requestPermissionsAsync();

    status = resultado.status;
  }

  return status === 'granted';
}

export async function agendarNotificacaoLembrete(
  titulo: string,
  mensagem: string,
  data: Date,
  petId: number
): Promise<string> {
  if (data.getTime() <= Date.now()) {
    throw new Error(
      'A data do lembrete precisa estar no futuro.'
    );
  }

  const permitido =
    await solicitarPermissaoNotificacoes();

  if (!permitido) {
    throw new Error(
      'Permissão de notificações não concedida.'
    );
  }

  const notificationId =
    await Notifications.scheduleNotificationAsync({
      content: {
        title: titulo,
        body: mensagem,
        sound: 'default',
        data: {
          screen: 'reminders-home',
          petId: String(petId),
        },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: data,
        ...(Platform.OS === 'android'
          ? { channelId: 'lembretes' }
          : {}),
      },
    });

  return notificationId;
}

export async function cancelarNotificacao(
  notificationId: string
): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(
    notificationId
  );
}
