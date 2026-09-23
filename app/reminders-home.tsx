import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';

import { Text } from '@/src/components/atoms/Text';
import { usePets } from '@/src/hooks/usePets';
import { useAppTheme } from '@/src/hooks/useAppTheme';
import { Tutor } from '@/src/types/Tutor';
import { Reminder } from '@/src/types/Reminder';
import {
  criarLembrete,
  excluirLembrete,
  listarLembretes,
} from '@/src/services/reminderService';

import IconBack from '@/assets/icons/icon-back.svg';
import IconVaccine from '@/assets/icons/icon-vaccine.svg';
import IconHome from '@/assets/icons/icon-home.svg';
import IconScore from '@/assets/icons/icon-score.svg';
import IconCalendar from '@/assets/icons/icon-calendar.svg';
import IconChat from '@/assets/icons/icon-chat.svg';
import IconMore from '@/assets/icons/icon-more.svg';

function pad(numero: number): string {
  return String(numero).padStart(2, '0');
}

function sugestaoData() {
  const data = new Date(Date.now() + 3 * 60 * 1000);

  return {
    dia: `${pad(data.getDate())}/${pad(data.getMonth() + 1)}/${data.getFullYear()}`,
    hora: `${pad(data.getHours())}:${pad(data.getMinutes())}`,
  };
}

function interpretarData(dia: string, hora: string): Date | null {
  const partesDia = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(dia.trim());
  const partesHora = /^(\d{2}):(\d{2})$/.exec(hora.trim());

  if (!partesDia || !partesHora) {
    return null;
  }

  const d = Number(partesDia[1]);
  const m = Number(partesDia[2]);
  const a = Number(partesDia[3]);
  const h = Number(partesHora[1]);
  const min = Number(partesHora[2]);

  if (h > 23 || min > 59) {
    return null;
  }

  const data = new Date(a, m - 1, d, h, min);

  if (
    data.getFullYear() !== a ||
    data.getMonth() !== m - 1 ||
    data.getDate() !== d ||
    data.getHours() !== h ||
    data.getMinutes() !== min
  ) {
    return null;
  }

  return data;
}

function formatarData(valor: string): string {
  const data = new Date(valor);

  return `${pad(data.getDate())}/${pad(data.getMonth() + 1)}/${data.getFullYear()} • ${pad(data.getHours())}:${pad(data.getMinutes())}`;
}

function prazo(valor: string): string {
  const diferenca = new Date(valor).getTime() - Date.now();

  if (diferenca <= 0) {
    return 'Passou';
  }

  const minutos = Math.ceil(diferenca / 60000);

  if (minutos < 60) {
    return `Em ${minutos} min`;
  }

  const horas = Math.ceil(minutos / 60);

  if (horas < 24) {
    return `Em ${horas} h`;
  }

  return `Em ${Math.ceil(horas / 24)} dias`;
}

export default function RemindersHome() {
  const { theme } = useAppTheme();
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [carregandoTutor, setCarregandoTutor] = useState(true);
  const [carregandoLembretes, setCarregandoLembretes] = useState(false);
  const [lembretes, setLembretes] = useState<Reminder[]>([]);
  const [aba, setAba] = useState<'proximas' | 'todos'>('proximas');

  const [modalAberto, setModalAberto] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [petId, setPetId] = useState<number | null>(null);

  const inicial = sugestaoData();
  const [dia, setDia] = useState(inicial.dia);
  const [hora, setHora] = useState(inicial.hora);

  const {
    data: pets,
    isLoading: carregandoPets,
    isError: erroPets,
    refetch: recarregarPets,
  } = usePets(tutor?.id);

  useEffect(() => {
    let ativo = true;

    async function carregarTutor() {
      try {
        const salvo = await AsyncStorage.getItem('@vitalpet:tutor');

        if (!salvo) {
          router.replace('/tutor-login');
          return;
        }

        const dados: Tutor = JSON.parse(salvo);

        if (!dados.id) {
          router.replace('/tutor-login');
          return;
        }

        if (ativo) {
          setTutor(dados);
        }
      } catch {
        Alert.alert('Erro', 'Não foi possível identificar o tutor.');
      } finally {
        if (ativo) {
          setCarregandoTutor(false);
        }
      }
    }

    carregarTutor();

    return () => {
      ativo = false;
    };
  }, []);

  const atualizarLembretes = useCallback(async () => {
    if (!tutor?.id) {
      return;
    }

    setCarregandoLembretes(true);

    try {
      const dados = await listarLembretes(tutor.id);
      setLembretes(dados);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar os lembretes.');
    } finally {
      setCarregandoLembretes(false);
    }
  }, [tutor?.id]);

  useFocusEffect(
    useCallback(() => {
      atualizarLembretes();
    }, [atualizarLembretes])
  );

  function abrirCadastro() {
    const sugestao = sugestaoData();

    setTitulo('');
    setPetId(pets?.[0]?.id ?? null);
    setDia(sugestao.dia);
    setHora(sugestao.hora);
    setModalAberto(true);
  }

  async function salvarLembrete() {
    if (!tutor?.id) {
      Alert.alert('Erro', 'Tutor não identificado.');
      return;
    }

    const pet = pets?.find(item => item.id === petId);

    if (!pet) {
      Alert.alert('Selecione um pet', 'Escolha o animal deste lembrete.');
      return;
    }

    if (!titulo.trim()) {
      Alert.alert('Título obrigatório', 'Informe o motivo do lembrete.');
      return;
    }

    const data = interpretarData(dia, hora);

    if (!data) {
      Alert.alert(
        'Data inválida',
        'Use DD/MM/AAAA para a data e HH:MM para o horário.'
      );
      return;
    }

    if (data.getTime() <= Date.now()) {
      Alert.alert(
        'Horário inválido',
        'Escolha uma data e um horário futuros.'
      );
      return;
    }

    setSalvando(true);

    try {
      const criado = await criarLembrete({
        tutorId: tutor.id,
        petId: pet.id,
        petNome: pet.nome,
        titulo: titulo.trim(),
        data: data.toISOString(),
      });

      setModalAberto(false);
      await atualizarLembretes();

      Alert.alert(
        'Lembrete salvo!',
        criado.notificationId
          ? 'Seu lembrete foi salvo e a notificação foi agendada.'
          : 'Seu lembrete foi salvo, mas a notificação não pôde ser agendada. Verifique as permissões do dispositivo.'
      );
    } catch (error) {
      Alert.alert(
        'Erro ao salvar',
        error instanceof Error ? error.message : 'Tente novamente.'
      );
    } finally {
      setSalvando(false);
    }
  }

  function confirmarExclusao(lembrete: Reminder) {
    Alert.alert(
      'Excluir lembrete',
      `Deseja excluir "${lembrete.titulo}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            if (!tutor?.id) {
              return;
            }

            try {
              await excluirLembrete(tutor.id, lembrete.id);
              await atualizarLembretes();
            } catch {
              Alert.alert('Erro', 'Não foi possível excluir o lembrete.');
            }
          },
        },
      ]
    );
  }

  const visiveis = lembretes.filter(
    item =>
      aba === 'todos' ||
      new Date(item.data).getTime() > Date.now()
  );

  if (carregandoTutor) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.surface }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 28,
          paddingTop: 48,
          paddingBottom: 200,
        }}
      >
        <TouchableOpacity
          onPress={() => router.push('/tutor-home')}
          style={{ marginBottom: 18 }}
        >
          <IconBack width={18} height={18} />
        </TouchableOpacity>

        <Text size={28} weight="700" color={theme.text}>
          Lembretes
        </Text>

        <Text size={17} color={theme.textSecondary} style={{ marginTop: 4 }}>
          Gerencie os cuidados dos seus pets
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 24,
            marginBottom: 24,
          }}
        >
          <TabButton
            label="Próximas"
            active={aba === 'proximas'}
            onPress={() => setAba('proximas')}
          />
          <TabButton
            label="Todos"
            active={aba === 'todos'}
            onPress={() => setAba('todos')}
          />
        </View>

        {carregandoLembretes && (
          <ActivityIndicator color={theme.primary} />
        )}

        {!carregandoLembretes && visiveis.length === 0 && (
          <Text size={16} color={theme.textSecondary}>
            {aba === 'proximas'
              ? 'Você não tem lembretes futuros.'
              : 'Você ainda não cadastrou lembretes.'}
          </Text>
        )}

        {visiveis.map(item => (
          <ReminderCard
            key={item.id}
            item={item}
            onExcluir={() => confirmarExclusao(item)}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={abrirCadastro}
        style={{
          position: 'absolute',
          left: 28,
          right: 28,
          bottom: 116,
          height: 58,
          backgroundColor: theme.primary,
          borderRadius: 14,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text size={18} color={theme.primaryText}>
          Adicionar lembrete
        </Text>
      </TouchableOpacity>

      <BottomNav />

      <Modal
        visible={modalAberto}
        transparent
        animationType="slide"
        onRequestClose={() => !salvando && setModalAberto(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.65)',
            justifyContent: 'flex-end',
          }}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              backgroundColor: theme.surface,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 24,
              paddingTop: 64,
              paddingBottom: 44,
            }}
          >
            <Text size={24} weight="700" color={theme.text}>
              Novo lembrete
            </Text>

            <Text size={15} color={theme.textSecondary} style={{ marginTop: 8 }}>
              Escolha o pet e quando deseja receber o aviso.
            </Text>

            <Text size={16} weight="700" color={theme.text} style={{ marginTop: 24 }}>
              Pet
            </Text>

            {carregandoPets && <ActivityIndicator color={theme.primary} />}

            {erroPets && (
              <TouchableOpacity onPress={() => recarregarPets()}>
                <Text size={15} color={theme.danger}>
                  Erro ao carregar pets. Toque para tentar novamente.
                </Text>
              </TouchableOpacity>
            )}

            {!carregandoPets && !erroPets && pets?.length === 0 && (
              <Text size={15} color={theme.textSecondary}>
                Cadastre um pet antes de criar um lembrete.
              </Text>
            )}

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
              {pets?.map(pet => (
                <TouchableOpacity
                  key={pet.id}
                  onPress={() => setPetId(pet.id)}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: 12,
                    marginRight: 8,
                    marginBottom: 8,
                    backgroundColor: petId === pet.id ? theme.primary : theme.surfaceSecondary,
                  }}
                >
                  <Text
                    size={15}
                    color={petId === pet.id ? theme.primaryText : theme.primary}
                  >
                    {pet.nome}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text size={16} weight="700" color={theme.text} style={{ marginTop: 14 }}>
              Título
            </Text>

            <TextInput
              value={titulo}
              onChangeText={setTitulo}
              placeholder="Ex.: Vacina, vermífugo, consulta..."
              placeholderTextColor={theme.textSecondary}
              style={{
                borderWidth: 1,
                borderColor: theme.border,
                borderRadius: 12,
                padding: 14,
                marginTop: 8,
                color: theme.text,
                backgroundColor: theme.surface,
                fontSize: 16,
              }}
            />

            <View style={{ flexDirection: 'row', marginTop: 16 }}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text size={16} weight="700" color={theme.text}>
                  Data
                </Text>
                <TextInput
                  value={dia}
                  onChangeText={setDia}
                  placeholder="DD/MM/AAAA"
                  keyboardType="numbers-and-punctuation"
                  maxLength={10}
                  style={{
                    borderWidth: 1,
                    borderColor: theme.border,
                    borderRadius: 12,
                    padding: 14,
                    marginTop: 8,
                    color: theme.text,
                    fontSize: 16,
                  }}
                />
              </View>

              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text size={16} weight="700" color={theme.text}>
                  Horário
                </Text>
                <TextInput
                  value={hora}
                  onChangeText={setHora}
                  placeholder="HH:MM"
                  keyboardType="numbers-and-punctuation"
                  maxLength={5}
                  style={{
                    borderWidth: 1,
                    borderColor: theme.border,
                    borderRadius: 12,
                    padding: 14,
                    marginTop: 8,
                    color: theme.text,
                    fontSize: 16,
                  }}
                />
              </View>
            </View>

            <TouchableOpacity
              disabled={salvando}
              onPress={salvarLembrete}
              style={{
                height: 54,
                backgroundColor: theme.primary,
                borderRadius: 14,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 26,
                opacity: salvando ? 0.6 : 1,
              }}
            >
              <Text size={17} color={theme.primaryText}>
                {salvando ? 'Salvando...' : 'Salvar lembrete'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={salvando}
              onPress={() => setModalAberto(false)}
              style={{ padding: 18, alignItems: 'center' }}
            >
              <Text size={16} color={theme.textSecondary}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

function TabButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  const { theme } = useAppTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        width: '48%',
        height: 42,
        borderRadius: 14,
        backgroundColor: active ? theme.primary : theme.tabInactive,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text size={16} color={active ? theme.primaryText : theme.text}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function ReminderCard({
  item,
  onExcluir,
}: {
  item: Reminder;
  onExcluir: () => void;
}) {
  const { theme } = useAppTheme();
  return (
    <View
      style={{
        minHeight: 86,
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: 16,
        backgroundColor: theme.surface,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginBottom: 14,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 4 },
        shadowOpacity: 0.16,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      <View
        style={{
          width: 42,
          height: 42,
          borderRadius: 6,
          backgroundColor: theme.surfaceSecondary,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 10,
        }}
      >
        <IconVaccine width={28} height={28} />
      </View>

      <View style={{ flex: 1 }}>
        <Text size={15} weight="700" color={theme.text}>
          {item.titulo}
        </Text>
        <Text size={13} color={theme.textSecondary} style={{ marginTop: 3 }}>
          {item.petNome}
        </Text>
        <Text size={12} color={theme.textSecondary} style={{ marginTop: 3 }}>
          {formatarData(item.data)}
        </Text>
        <Text size={12} color={theme.primary} style={{ marginTop: 3 }}>
          {prazo(item.data)}
        </Text>
      </View>

      <TouchableOpacity
        onPress={onExcluir}
        style={{ padding: 8 }}
      >
        <Text size={13} color={theme.danger}>
          Excluir
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function BottomNav() {
  const { theme } = useAppTheme();
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 86,
        backgroundColor: theme.surface,
        borderTopWidth: 1,
        borderTopColor: theme.border,
        paddingHorizontal: 28,
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <TabItem
        icon={<IconHome width={30} height={30} />}
        label="Home"
        onPress={() => router.push('/tutor-home')}
      />
      <TabItem
        icon={<IconScore width={30} height={30} />}
        label="Score"
        onPress={() => router.push('/score-home')}
      />
      <TabItem
        icon={<IconCalendar width={30} height={30} />}
        label="Histórico"
        onPress={() => router.push('/history-home')}
      />
      <TabItem
        icon={<IconChat width={30} height={30} />}
        label="Chat"
        onPress={() => router.push('/chat-home')}
      />
      <TabItem
        icon={<IconMore width={30} height={30} />}
        label="Mais"
        onPress={() => router.push('/more-home')}
      />
    </View>
  );
}

function TabItem({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}) {
  const { theme } = useAppTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        width: 60,
        height: 70,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {icon}
      <Text
        size={11}
        weight="700"
        color={theme.textSecondary}
        style={{ marginTop: 3 }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
