import {
  View,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';
import { usePets } from '@/src/hooks/usePets';
import { Pet } from '@/src/types/Pet';

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
  const { width } = useWindowDimensions();

  const {
    data: pets,
    isLoading,
    isError,
    refetch,
  } = usePets();

  const contentWidth = Math.min(width, 480);
  const availableWidth = contentWidth - padding * 2;

  const quickCardWidth =
    (availableWidth - quickGap * 3) / 4;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: '100%',
          maxWidth: 480,
          flex: 1,
          backgroundColor: '#FFFFFF',
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
                color="#111827"
              >
                Olá, João!
              </Text>

              <Text
                size={18}
                color="#333333"
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

          {isLoading && (
            <View
              style={{
                height: 158,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ActivityIndicator
                size="large"
                color="#0A66C2"
              />

              <Text
                size={14}
                color="#7D7D7D"
                style={{
                  marginTop: 10,
                }}
              >
                Carregando pets...
              </Text>
            </View>
          )}

          {isError && (
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
                color="#B42318"
                align="center"
              >
                Não foi possível carregar os pets.
              </Text>

              <Text
                size={13}
                color="#7D7D7D"
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

          {!isLoading && !isError && (
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

          <ReminderCard
            image={
              <ReminderIcon
                label="V"
                background="#E8F1FF"
                color="#0A66C2"
              />
            }
            title="Vacina múltipla"
            subtitle="Próxima aplicação"
          />

          <ReminderCard
            image={
              <ReminderIcon
                label="M"
                background="#EAF8EF"
                color="#008047"
              />
            }
            title="Vermífugo"
            subtitle="Acompanhe a próxima dose"
          />

          <ReminderCard
            image={
              <View
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 21,
                  backgroundColor: '#DCEBFF',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <Image
                  source={PetBanho}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                  resizeMode="contain"
                />
              </View>
            }
            title="Banho e tosa"
            subtitle="Cuidados do pet"
          />

          {/* =====================================================
              AÇÕES RÁPIDAS
          ===================================================== */}

          <Text
            size={20}
            weight="700"
            color="#000000"
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
  const initial =
    name?.trim().charAt(0).toUpperCase() || '?';

  return (
    <View
      style={{
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: '#E8F1FF',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        size={17}
        weight="700"
        color="#0A66C2"
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
        color="#000000"
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
            color="#0A66C2"
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
        borderColor: '#D1D5DB',
        borderRadius: 18,

        padding: 10,

        backgroundColor: '#FFFFFF',

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
        color="#000000"
        numberOfLines={1}
        style={{
          marginTop: 6,
        }}
      >
        {pet.nome}
      </Text>

      <Text
        size={13}
        color="#333333"
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
          color="#7D7D7D"
        >
          Alertas
        </Text>

        <Text
          size={23}
          weight="700"
          color="#111827"
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
        borderColor: '#D1D5DB',
        borderRadius: 18,

        backgroundColor: '#FFFFFF',

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
        color="#0A66C2"
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
  return (
    <View
      style={{
        minHeight: 70,

        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 18,

        backgroundColor: '#FFFFFF',

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
          color="#111827"
        >
          {title}
        </Text>

        <Text
          size={14}
          color="#8A8A8A"
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
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        width,
        height: 88,

        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 14,

        backgroundColor: '#FFFFFF',

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
        color="#333333"
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
  return (
    <View
      style={{
        position: 'absolute',

        left: 0,
        right: 0,
        bottom: 0,

        height: 92,

        backgroundColor: '#FFFFFF',

        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',

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
          ? '#E8F1FF'
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
            ? '#0A66C2'
            : '#7D7D7D'
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