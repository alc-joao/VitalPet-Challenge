import {
  View,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Image,
  ActivityIndicator,
} from 'react-native';

import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Text } from '@/src/components/atoms/Text';
import { usePets } from '@/src/hooks/usePets';
import { Pet } from '@/src/types/Pet';
import { Tutor } from '@/src/types/Tutor';
import { useAppTheme } from '@/src/hooks/useAppTheme';
import { Reminder } from '@/src/types/Reminder';
import { listarLembretes } from '@/src/services/reminderService';

import IconBell from '@/assets/icons/icon-bell.svg';
import IconPlus from '@/assets/icons/icon-plus.svg';
import IconArrowRight from '@/assets/icons/icon-arrow-right.svg';

import IconHome from '@/assets/icons/icon-home.svg';
import IconScore from '@/assets/icons/icon-score.svg';
import IconCalendar from '@/assets/icons/icon-calendar.svg';
import IconChat from '@/assets/icons/icon-chat.svg';
import IconMore from '@/assets/icons/icon-more.svg';

import IconConsult from '@/assets/icons/icon-consult.svg';
import IconVaccine from '@/assets/icons/icon-vaccine.svg';
import IconMedicine from '@/assets/icons/icon-medicine.svg';
import IconEmergency from '@/assets/icons/icon-emergency.svg';

const PetBanho = require('@/assets/images/banho-e-tosa.png');

const padding = 20;
const quickGap = 8;

export default function TutorHome() {
  const { theme } = useAppTheme();
  const { width } = useWindowDimensions();

  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [loadingTutor, setLoadingTutor] = useState(true);
  const [lembretes, setLembretes] = useState<Reminder[]>([]);
  const [erroLembretes, setErroLembretes] = useState(false);

  useEffect(() => {
    async function loadTutor() {
      try {
        const storedTutor = await AsyncStorage.getItem(
          '@vitalpet:tutor'
        );

        if (!storedTutor) {
          router.replace('/tutor-login');
          return;
        }

        const tutorSalvo: Tutor = JSON.parse(storedTutor);

        if (!tutorSalvo.id) {
          await AsyncStorage.removeItem('@vitalpet:tutor');
          router.replace('/tutor-login');
          return;
        }

        setTutor(tutorSalvo);
      } catch (error) {
        console.error(
          'Erro ao carregar tutor:',
          error
        );

        await AsyncStorage.removeItem('@vitalpet:tutor');
        router.replace('/tutor-login');
      } finally {
        setLoadingTutor(false);
      }
    }

    loadTutor();
  }, []);

  const {
    data: pets,
    isLoading,
    isError,
    refetch,
  } = usePets(tutor?.id);

  useFocusEffect(
    useCallback(() => {
      if (!tutor?.id) {
        setLembretes([]);
        return;
      }

      let ativo = true;

      async function carregarLembretes() {
        try {
          const dados = await listarLembretes(tutor!.id);

          if (ativo) {
            setLembretes(
              dados
                .filter(
                  item => new Date(item.data).getTime() > Date.now()
                )
                .slice(0, 3)
            );
            setErroLembretes(false);
          }
        } catch (error) {
          console.error('Erro ao carregar lembretes:', error);

          if (ativo) {
            setErroLembretes(true);
          }
        }
      }

      carregarLembretes();

      return () => {
        ativo = false;
      };
    }, [tutor?.id])
  );

  const contentWidth = Math.min(width, 480);
  const availableWidth = contentWidth - padding * 2;

  const quickCardWidth =
    (availableWidth - quickGap * 3) / 4;

  const primeiroNome =
    tutor?.nome?.trim().split(' ')[0] || '';

  const carregando = loadingTutor || isLoading;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.surface,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: '100%',
          maxWidth: 480,
          flex: 1,
          backgroundColor: theme.surface,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: padding,
            paddingTop: 42,
            paddingBottom: 125,
          }}
        >
          {/* =====================================================
              CABEÇALHO
          ===================================================== */}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <View>
              <Text
                size={22}
                weight="700"
                color={theme.text}
              >
                {primeiroNome
                  ? `Olá, ${primeiroNome}!`
                  : 'Olá!'}
              </Text>

              <Text
                size={18}
                color={theme.textSecondary}
              >
                Bem-vindo de volta!
              </Text>
            </View>

            <TouchableOpacity
              style={{
                marginTop: 8,
              }}
              activeOpacity={0.8}
            >
              <IconBell
                width={24}
                height={24}
              />
            </TouchableOpacity>
          </View>

          {/* =====================================================
              PETS
          ===================================================== */}

          <SectionHeader title="Meus pets" />

          {carregando && (
            <View
              style={{
                height: 158,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ActivityIndicator
                size="large"
                color={theme.primary}
              />

              <Text
                size={14}
                color={theme.textSecondary}
                style={{
                  marginTop: 10,
                }}
              >
                Carregando pets...
              </Text>
            </View>
          )}

          {!loadingTutor && isError && (
            <View
              style={{
                minHeight: 130,
                borderWidth: 1,
                borderColor: '#F3B8B8',
                borderRadius: 18,
                backgroundColor: '#FFF5F5',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
              }}
            >
              <Text
                size={16}
                weight="700"
                color={theme.danger}
                align="center"
              >
                Não foi possível carregar os pets.
              </Text>

              <Text
                size={13}
                color={theme.textSecondary}
                align="center"
                style={{
                  marginTop: 6,
                }}
              >
                Verifique se a API Java está rodando.
              </Text>

              <TouchableOpacity
                onPress={() => refetch()}
                activeOpacity={0.8}
                style={{
                  marginTop: 14,
                  backgroundColor: '#0A66C2',
                  paddingHorizontal: 18,
                  paddingVertical: 9,
                  borderRadius: 10,
                }}
              >
                <Text
                  size={13}
                  weight="700"
                  color="#FFFFFF"
                >
                  Tentar novamente
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {!carregando && !isError && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 10,
                paddingBottom: 8,
              }}
            >
              {pets?.map((pet) => (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  onPress={() =>
                    router.push({
                      pathname: '/pet-detail',
                      params: {
                        petId: String(pet.id),
                      },
                    })
                  }
                />
              ))}

              <AddPetCard />
            </ScrollView>
          )}

          {/* =====================================================
              LEMBRETES
          ===================================================== */}

          <SectionHeader
            title="Próximos lembretes"
            onPress={() =>
              router.push('/reminders-home')
            }
          />

          {erroLembretes && (
            <Text size={14} color={theme.danger}>
              Não foi possível carregar os lembretes.
            </Text>
          )}

          {!erroLembretes && lembretes.length === 0 && (
            <TouchableOpacity
              onPress={() => router.push('/reminders-home')}
              style={{ paddingVertical: 20 }}
            >
              <Text size={15} color={theme.textSecondary}>
                Nenhum lembrete futuro. Toque para adicionar.
              </Text>
            </TouchableOpacity>
          )}

          {!erroLembretes && lembretes.map(item => {
            const data = new Date(item.data);

            const dataFormatada = data.toLocaleString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <ReminderCard
                key={item.id}
                image={
                  <ReminderIcon
                    label={item.titulo.charAt(0).toUpperCase()}
                    background="#E8F1FF"
                    color={theme.primary}
                  />
                }
                title={item.titulo}
                subtitle={`${item.petNome} • ${dataFormatada}`}
              />
            );
          })}

          {/* =====================================================
              AÇÕES RÁPIDAS
          ===================================================== */}

          <Text
            size={20}
            weight="700"
            color={theme.text}
            style={{
              marginTop: 20,
              marginBottom: 16,
            }}
          >
            Ações rápidas
          </Text>

          <View
            style={{
              flexDirection: 'row',
              gap: quickGap,
            }}
          >
            <QuickAction
              width={quickCardWidth}
              icon={
                <IconConsult
                  width={26}
                  height={26}
                />
              }
              label="Consultas"
              onPress={() =>
                router.push('/consults-home')
              }
            />

            <QuickAction
              width={quickCardWidth}
              icon={
                <IconVaccine
                  width={26}
                  height={26}
                />
              }
              label="Vacinas"
              onPress={() =>
                router.push('/vaccines-home')
              }
            />

            <QuickAction
              width={quickCardWidth}
              icon={
                <IconMedicine
                  width={26}
                  height={26}
                />
              }
              label="Medicações"
              onPress={() =>
                router.push('/medications-home')
              }
            />

            <QuickAction
              width={quickCardWidth}
              icon={
                <IconEmergency
                  width={26}
                  height={26}
                />
              }
              label="Emergência"
              onPress={() =>
                router.push('/emergency-home')
              }
            />
          </View>
        </ScrollView>

        <BottomNav />
      </View>
    </View>
  );
}

/* =========================================================
   AVATAR DO PET
========================================================= */

function PetAvatar({
  name,
}: {
  name: string;
}) {
  const { theme } = useAppTheme();

  const initial =
    name?.trim().charAt(0).toUpperCase() || '?';

  return (
    <View
      style={{
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: theme.surfaceSecondary,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        size={17}
        weight="700"
        color={theme.primary}
      >
        {initial}
      </Text>
    </View>
  );
}

/* =========================================================
   ÍCONE DE LEMBRETE
========================================================= */

function ReminderIcon({
  label,
  background,
  color,
}: {
  label: string;
  background: string;
  color: string;
}) {
  const { theme } = useAppTheme();
  return (
    <View
      style={{
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: background,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        size={16}
        weight="700"
        color={color}
      >
        {label}
      </Text>
    </View>
  );
}

/* =========================================================
   CABEÇALHO DAS SEÇÕES
========================================================= */

function SectionHeader({
  title,
  onPress,
}: {
  title: string;
  onPress?: () => void;
}) {
  const { theme } = useAppTheme();
  return (
    <View
      style={{
        marginTop: 28,
        marginBottom: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text
        size={20}
        weight="700"
        color={theme.text}
      >
        {title}
      </Text>

      {onPress && (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.8}
        >
          <Text
            size={16}
            weight="700"
            color={theme.primary}
          >
            Ver todos
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

/* =========================================================
   CARD DO PET
========================================================= */

function PetCard({
  pet,
  onPress,
}: {
  pet: Pet;
  onPress: () => void;
}) {
  const { theme } = useAppTheme();
  const possuiAlerta =
    pet.quantidadeAlertas > 0;

  const status = possuiAlerta
    ? 'Atenção'
    : 'Saudável';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        width: 150,
        height: 158,

        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: 18,

        padding: 10,

        backgroundColor: theme.surface,

        shadowColor: '#000000',
        shadowOffset: {
          width: 3,
          height: 4,
        },
        shadowOpacity: 0.18,
        shadowRadius: 4,

        elevation: 5,
      }}
    >
      <PetAvatar name={pet.nome} />

      <Text
        size={17}
        weight="700"
        color={theme.text}
        numberOfLines={1}
        style={{
          marginTop: 6,
        }}
      >
        {pet.nome}
      </Text>

      <Text
        size={13}
        color={theme.textSecondary}
        numberOfLines={1}
        style={{
          lineHeight: 15,
        }}
      >
        {pet.raca}
      </Text>

      <View
        style={{
          alignSelf: 'flex-start',

          backgroundColor: possuiAlerta
            ? '#F5F3B8'
            : '#BDF5D2',

          borderRadius: 20,

          paddingHorizontal: 8,
          paddingVertical: 3,

          marginTop: 9,
        }}
      >
        <Text
          size={11}
          weight="700"
          color={
            possuiAlerta
              ? '#6B6B00'
              : '#008047'
          }
        >
          {status}
        </Text>
      </View>

      <View
        style={{
          marginTop: 'auto',

          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <Text
          size={12}
          weight="700"
          color={theme.textSecondary}
        >
          Alertas
        </Text>

        <Text
          size={23}
          weight="700"
          color={theme.text}
        >
          {pet.quantidadeAlertas}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

/* =========================================================
   ADICIONAR PET
========================================================= */

function AddPetCard() {
  const { theme } = useAppTheme();
  return (
    <TouchableOpacity
      onPress={() =>
        router.push('/pet-form')
      }
      activeOpacity={0.85}
      style={{
        width: 78,
        height: 158,

        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: 18,

        backgroundColor: theme.surface,

        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: '#000000',
        shadowOffset: {
          width: 3,
          height: 4,
        },
        shadowOpacity: 0.18,
        shadowRadius: 4,

        elevation: 5,
      }}
    >
      <View
        style={{
          width: 42,
          height: 42,
          borderRadius: 21,

          borderWidth: 2,
          borderColor: '#0A66C2',

          alignItems: 'center',
          justifyContent: 'center',

          marginBottom: 10,
        }}
      >
        <IconPlus
          width={22}
          height={22}
        />
      </View>

      <Text
        size={11}
        weight="700"
        color={theme.primary}
        align="center"
      >
        Adicionar{'\n'}pet
      </Text>
    </TouchableOpacity>
  );
}

/* =========================================================
   CARD DE LEMBRETE
========================================================= */

function ReminderCard({
  image,
  title,
  subtitle,
}: {
  image: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  const { theme } = useAppTheme();
  return (
    <View
      style={{
        minHeight: 70,

        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: 18,

        backgroundColor: theme.surface,

        flexDirection: 'row',
        alignItems: 'center',

        paddingHorizontal: 14,
        paddingVertical: 10,

        marginBottom: 10,

        shadowColor: '#000000',
        shadowOffset: {
          width: 3,
          height: 4,
        },
        shadowOpacity: 0.16,
        shadowRadius: 4,

        elevation: 4,
      }}
    >
      {image}

      <View
        style={{
          flex: 1,
          marginLeft: 14,
        }}
      >
        <Text
          size={16}
          weight="700"
          color={theme.text}
        >
          {title}
        </Text>

        <Text
          size={14}
          color={theme.textSecondary}
        >
          {subtitle}
        </Text>
      </View>

      <IconArrowRight
        width={22}
        height={22}
      />
    </View>
  );
}

/* =========================================================
   AÇÃO RÁPIDA
========================================================= */

function QuickAction({
  width,
  icon,
  label,
  onPress,
}: {
  width: number;
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}) {
  const { theme } = useAppTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        width,
        height: 88,

        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: 14,

        backgroundColor: theme.surface,

        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: '#000000',
        shadowOffset: {
          width: 3,
          height: 4,
        },
        shadowOpacity: 0.18,
        shadowRadius: 4,

        elevation: 5,
      }}
    >
      {icon}

      <Text
        size={10}
        color={theme.textSecondary}
        align="center"
        style={{
          marginTop: 10,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/* =========================================================
   BARRA INFERIOR
========================================================= */

function BottomNav() {
  const { theme } = useAppTheme();
  return (
    <View
      style={{
        position: 'absolute',

        left: 0,
        right: 0,
        bottom: 0,

        height: 92,

        backgroundColor: theme.surface,

        borderTopWidth: 1,
        borderTopColor: theme.border,

        paddingHorizontal: 16,
        paddingTop: 8,

        flexDirection: 'row',

        zIndex: 99,
        elevation: 99,
      }}
    >
      <TabItem
        icon={
          <IconHome
            width={28}
            height={28}
          />
        }
        label="Home"
        active
      />

      <TabItem
        icon={
          <IconScore
            width={28}
            height={28}
          />
        }
        label="Score"
        onPress={() =>
          router.push('/score-home')
        }
      />

      <TabItem
        icon={
          <IconCalendar
            width={28}
            height={28}
          />
        }
        label="Histórico"
        onPress={() =>
          router.push('/history-home')
        }
      />

      <TabItem
        icon={
          <IconChat
            width={28}
            height={28}
          />
        }
        label="Chat"
        onPress={() =>
          router.push('/chat-home')
        }
      />

      <TabItem
        icon={
          <IconMore
            width={28}
            height={28}
          />
        }
        label="Mais"
        onPress={() =>
          router.push('/more-home')
        }
      />
    </View>
  );
}

/* =========================================================
   ITEM DA BARRA INFERIOR
========================================================= */

function TabItem({
  icon,
  label,
  active,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onPress?: () => void;
}) {
  const { theme } = useAppTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={active}
      style={{
        flex: 1,

        height: 72,

        borderRadius: 14,

        backgroundColor: active
          ? theme.surfaceSecondary
          : 'transparent',

        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {icon}

      <Text
        size={11}
        weight="700"
        color={
          active
            ? theme.primary
            : theme.textSecondary
        }
        style={{
          marginTop: 4,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}