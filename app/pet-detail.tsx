import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  Modal,
} from 'react-native';

import {
  router,
  useLocalSearchParams,
} from 'expo-router';

import { useState } from 'react';

import { Text } from '@/src/components/atoms/Text';

import {
  useDeletePet,
  usePet,
} from '@/src/hooks/usePets';

import IconBack from '@/assets/icons/icon-back.svg';
import IconConsult from '@/assets/icons/icon-consult.svg';
import IconVaccine from '@/assets/icons/icon-vaccine.svg';
import IconWorm from '@/assets/icons/icon-worm.svg';
import IconWeight from '@/assets/icons/icon-weight.svg';
import IconFood from '@/assets/icons/icon-food.svg';
import IconActivity from '@/assets/icons/icon-activity.svg';
import IconWater from '@/assets/icons/icon-water.svg';
import IconBehavior from '@/assets/icons/icon-behavior.svg';

const PetDefault = require('@/assets/images/pitbul.png');

const { width } = Dimensions.get('window');

const padding = 17;
const gap = 10;

const cardWidth =
  (width - padding * 2 - gap) / 2;

function calcularIdade(
  dataNascimento: string
) {
  const nascimento = new Date(
    `${dataNascimento}T00:00:00`
  );

  const hoje = new Date();

  let anos =
    hoje.getFullYear() -
    nascimento.getFullYear();

  const mes =
    hoje.getMonth() -
    nascimento.getMonth();

  if (
    mes < 0 ||
    (mes === 0 &&
      hoje.getDate() <
        nascimento.getDate())
  ) {
    anos--;
  }

  if (anos <= 0) {
    const meses =
      (hoje.getFullYear() -
        nascimento.getFullYear()) *
        12 +
      hoje.getMonth() -
      nascimento.getMonth();

    if (meses <= 1) {
      return 'Menos de 1 mês';
    }

    return `${meses} meses`;
  }

  return anos === 1
    ? '1 ano'
    : `${anos} anos`;
}

export default function PetDetail() {
  const params =
    useLocalSearchParams<{
      petId?: string;
    }>();

  const petId = Number(params.petId);

  const [modalExcluir, setModalExcluir] =
    useState(false);

  const [erroExclusao, setErroExclusao] =
    useState('');

  const {
    data: pet,
    isLoading,
    isError,
    refetch,
  } = usePet(petId);

  const deletePetMutation =
    useDeletePet();

  function editarPet() {
    if (!pet) {
      return;
    }

    router.push(
      `/pet-profile?petId=${pet.id}`
    );
  }

  function abrirExclusao() {
    setErroExclusao('');
    setModalExcluir(true);
  }

  function fecharExclusao() {
    if (deletePetMutation.isPending) {
      return;
    }

    setModalExcluir(false);
    setErroExclusao('');
  }

  async function excluirPet() {
    if (!pet) {
      return;
    }

    try {
      setErroExclusao('');

      await deletePetMutation.mutateAsync(
        pet.id
      );

      setModalExcluir(false);

      router.replace('/tutor-home');
    } catch (error) {
      console.error(
        'Erro ao excluir pet:',
        error
      );

      setErroExclusao(
        'Não foi possível excluir o pet. Tente novamente.'
      );
    }
  }

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator
          size="large"
          color="#0A66C2"
        />

        <Text
          size={16}
          color="#6B7280"
          style={{
            marginTop: 16,
          }}
        >
          Carregando pet...
        </Text>
      </View>
    );
  }

  if (
    isError ||
    !pet ||
    !petId ||
    Number.isNaN(petId)
  ) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 30,
        }}
      >
        <Text
          size={22}
          weight="700"
          color="#111827"
          align="center"
        >
          Não foi possível carregar o pet
        </Text>

        <Text
          size={15}
          color="#6B7280"
          align="center"
          style={{
            marginTop: 10,
          }}
        >
          Verifique a conexão com a API e tente novamente.
        </Text>

        <TouchableOpacity
          onPress={() => refetch()}
          style={{
            backgroundColor: '#0A66C2',
            paddingHorizontal: 28,
            paddingVertical: 14,
            borderRadius: 14,
            marginTop: 24,
          }}
        >
          <Text
            size={16}
            weight="700"
            color="#FFFFFF"
          >
            Tentar novamente
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            marginTop: 20,
          }}
        >
          <Text
            size={16}
            weight="700"
            color="#0A66C2"
          >
            Voltar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const idade = calcularIdade(
    pet.dataNascimento
  );

  const status =
    pet.quantidadeAlertas > 0
      ? 'Atenção'
      : 'Saudável';

  const statusBackground =
    pet.quantidadeAlertas > 0
      ? '#FFF0C2'
      : '#BDF5D2';

  const statusColor =
    pet.quantidadeAlertas > 0
      ? '#9A6700'
      : '#008047';

  const excluindo =
    deletePetMutation.isPending;

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
        }}
        contentContainerStyle={{
          paddingHorizontal: padding,
          paddingTop: 56,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* CABEÇALHO */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent:
              'space-between',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            disabled={excluindo}
            style={{
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconBack
              width={13}
              height={22}
            />
          </TouchableOpacity>

          {/* BOTÕES DE AÇÃO */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <TouchableOpacity
              onPress={editarPet}
              disabled={excluindo}
              activeOpacity={0.8}
              style={{
                backgroundColor:
                  '#0A66C2',
                borderRadius: 10,
                paddingHorizontal: 17,
                paddingVertical: 10,
              }}
            >
              <Text
                size={14}
                weight="700"
                color="#FFFFFF"
              >
                Editar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={abrirExclusao}
              disabled={excluindo}
              activeOpacity={0.8}
              style={{
                backgroundColor:
                  '#DC2626',
                borderRadius: 10,
                paddingHorizontal: 17,
                paddingVertical: 10,
              }}
            >
              <Text
                size={14}
                weight="700"
                color="#FFFFFF"
              >
                Excluir
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* PET */}

        <View
          style={{
            alignItems: 'center',
            marginTop: 18,
          }}
        >
          <View
            style={{
              width: 190,
              height: 190,
              borderRadius: 95,
              overflow: 'hidden',
            }}
          >
            <Image
              source={PetDefault}
              style={{
                width: 190,
                height: 190,
              }}
              resizeMode="cover"
            />
          </View>

          <Text
            size={38}
            weight="700"
            color="#000000"
            align="center"
            style={{
              marginTop: 18,
            }}
          >
            {pet.nome}
          </Text>

          <Text
            size={22}
            weight="700"
            color="#7D7D7D"
            align="center"
            style={{
              marginTop: 6,
            }}
          >
            {pet.raca} • {idade}
          </Text>

          <Text
            size={16}
            weight="600"
            color="#7D7D7D"
            align="center"
            style={{
              marginTop: 6,
            }}
          >
            {pet.especie} •{' '}
            {pet.sexo === 'MACHO'
              ? 'Macho'
              : 'Fêmea'}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 16,
            }}
          >
            <View
              style={{
                backgroundColor:
                  statusBackground,
                borderRadius: 10,
                paddingHorizontal: 14,
                paddingVertical: 6,
                marginRight: 8,
                shadowColor: '#000',
                shadowOffset: {
                  width: 1,
                  height: 2,
                },
                shadowOpacity: 0.15,
                shadowRadius: 2,
                elevation: 3,
              }}
            >
              <Text
                size={16}
                weight="700"
                color={statusColor}
              >
                {status}
              </Text>
            </View>

            <View
              style={{
                backgroundColor:
                  '#FFFFFF',
                borderRadius: 10,
                paddingHorizontal: 14,
                paddingVertical: 6,
                shadowColor: '#000',
                shadowOffset: {
                  width: 1,
                  height: 2,
                },
                shadowOpacity: 0.15,
                shadowRadius: 2,
                elevation: 3,
              }}
            >
              <Text
                size={16}
                weight="700"
                color="#777777"
              >
                Alertas{' '}
                <Text color="#000000">
                  {
                    pet.quantidadeAlertas
                  }
                </Text>
              </Text>
            </View>
          </View>
        </View>

        {/* ABAS */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent:
              'space-between',
            marginTop: 42,
            marginBottom: 26,
          }}
        >
          {[
            'Resumo',
            'Consultas',
            'Vacinas',
            'Alertas',
          ].map((item, index) => (
            <View
              key={item}
              style={{
                alignItems: 'center',
                flex: 1,
              }}
            >
              <Text
                size={14}
                weight="700"
                color={
                  index === 0
                    ? '#000000'
                    : '#858585'
                }
                align="center"
              >
                {item}
              </Text>

              {index === 0 && (
                <View
                  style={{
                    width: 64,
                    height: 5,
                    borderRadius: 4,
                    backgroundColor:
                      '#0A66C2',
                    marginTop: 14,
                  }}
                />
              )}
            </View>
          ))}
        </View>

        {/* PESO E CONSULTAS */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent:
              'space-between',
          }}
        >
          <InfoCard
            icon={
              <BlueIconBox>
                <IconWeight
                  width={28}
                  height={28}
                />
              </BlueIconBox>
            }
            title="Peso"
            value={`${String(
              pet.peso
            ).replace('.', ',')} kg`}
          />

          <InfoCard
            icon={
              <BlueIconBox>
                <IconConsult
                  width={28}
                  height={28}
                />
              </BlueIconBox>
            }
            title="Consultas"
            value={String(
              pet.quantidadeConsultas
            )}
          />
        </View>

        {/* NASCIMENTO E ALERTAS */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent:
              'space-between',
            marginTop: 16,
          }}
        >
          <InfoCard
            icon={
              <BlueIconBox>
                <IconVaccine
                  width={28}
                  height={28}
                />
              </BlueIconBox>
            }
            title="Nascimento"
            value={formatarData(
              pet.dataNascimento
            )}
          />

          <InfoCard
            icon={
              <BlueIconBox>
                <IconWorm
                  width={28}
                  height={28}
                />
              </BlueIconBox>
            }
            title="Alertas"
            value={String(
              pet.quantidadeAlertas
            )}
          />
        </View>

        {/* OBSERVAÇÕES */}

        <Text
          size={22}
          weight="700"
          color="#000000"
          style={{
            marginTop: 28,
            marginBottom: 18,
          }}
        >
          Informações do pet
        </Text>

        <View
          style={{
            borderWidth: 1,
            borderColor: '#D1D5DB',
            borderRadius: 12,
            padding: 18,
            backgroundColor:
              '#FFFFFF',
            shadowColor: '#000',
            shadowOffset: {
              width: 2,
              height: 3,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3,
          }}
        >
          <Text
            size={14}
            weight="700"
            color="#858585"
          >
            Observações
          </Text>

          <Text
            size={17}
            weight="600"
            color="#111827"
            style={{
              marginTop: 8,
              lineHeight: 24,
            }}
          >
            {pet.observacoes ||
              'Nenhuma observação cadastrada.'}
          </Text>
        </View>

        {/* VISÃO GERAL */}

        <Text
          size={22}
          weight="700"
          color="#000000"
          style={{
            marginTop: 28,
            marginBottom: 18,
          }}
        >
          Visão geral da saúde
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent:
              'space-between',
          }}
        >
          <InfoCard
            icon={
              <GreenIconBox>
                <IconFood
                  width={28}
                  height={28}
                />
              </GreenIconBox>
            }
            title="Alimentação"
            value="Não informado"
          />

          <InfoCard
            icon={
              <GreenIconBox>
                <IconActivity
                  width={28}
                  height={28}
                />
              </GreenIconBox>
            }
            title="Atividade"
            value="Não informado"
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent:
              'space-between',
            marginTop: 16,
          }}
        >
          <InfoCard
            icon={
              <GreenIconBox>
                <IconWater
                  width={28}
                  height={28}
                />
              </GreenIconBox>
            }
            title="Hidratação"
            value="Não informado"
          />

          <InfoCard
            icon={
              <GreenIconBox>
                <IconBehavior
                  width={28}
                  height={28}
                />
              </GreenIconBox>
            }
            title="Comportamento"
            value="Não informado"
          />
        </View>

        <TouchableOpacity
          style={{
            height: 66,
            backgroundColor: '#0A66C2',
            borderRadius: 18,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 46,
          }}
        >
          <Text
            size={20}
            weight="700"
            color="#FFFFFF"
          >
            Ver linha do tempo
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* MODAL DE EXCLUSÃO */}

      <Modal
        visible={modalExcluir}
        transparent
        animationType="fade"
        onRequestClose={
          fecharExclusao
        }
      >
        <View
          style={{
            flex: 1,
            backgroundColor:
              'rgba(0, 0, 0, 0.45)',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 24,
          }}
        >
          <View
            style={{
              width: '100%',
              maxWidth: 420,
              backgroundColor:
                '#FFFFFF',
              borderRadius: 20,
              padding: 24,
            }}
          >
            <Text
              size={24}
              weight="700"
              color="#111827"
              align="center"
            >
              Excluir pet?
            </Text>

            <Text
              size={16}
              color="#6B7280"
              align="center"
              style={{
                marginTop: 12,
                lineHeight: 23,
              }}
            >
              Tem certeza que deseja
              excluir {pet.nome}? Essa
              ação não poderá ser
              desfeita.
            </Text>

            {erroExclusao ? (
              <Text
                size={14}
                weight="600"
                color="#DC2626"
                align="center"
                style={{
                  marginTop: 16,
                }}
              >
                {erroExclusao}
              </Text>
            ) : null}

            <TouchableOpacity
              onPress={excluirPet}
              disabled={excluindo}
              activeOpacity={0.8}
              style={{
                height: 54,
                backgroundColor:
                  excluindo
                    ? '#F87171'
                    : '#DC2626',
                borderRadius: 14,
                alignItems: 'center',
                justifyContent:
                  'center',
                marginTop: 24,
              }}
            >
              {excluindo ? (
                <ActivityIndicator
                  color="#FFFFFF"
                />
              ) : (
                <Text
                  size={17}
                  weight="700"
                  color="#FFFFFF"
                >
                  Sim, excluir pet
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={fecharExclusao}
              disabled={excluindo}
              activeOpacity={0.8}
              style={{
                height: 54,
                borderWidth: 1,
                borderColor: '#D1D5DB',
                borderRadius: 14,
                alignItems: 'center',
                justifyContent:
                  'center',
                marginTop: 10,
              }}
            >
              <Text
                size={17}
                weight="700"
                color="#111827"
              >
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

function formatarData(
  data: string
) {
  const [ano, mes, dia] =
    data.split('-');

  return `${dia}/${mes}/${ano}`;
}

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <View
      style={{
        width: cardWidth,
        minHeight: 92,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 14,
        shadowColor: '#000',
        shadowOffset: {
          width: 3,
          height: 4,
        },
        shadowOpacity: 0.18,
        shadowRadius: 3,
        elevation: 5,
      }}
    >
      {icon}

      <View
        style={{
          flex: 1,
          marginLeft: 12,
        }}
      >
        <Text
          size={14}
          weight="700"
          color="#858585"
          style={{
            lineHeight: 18,
          }}
        >
          {title}
        </Text>

        <Text
          size={17}
          weight="700"
          color="#000000"
          style={{
            marginTop: 6,
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

function BlueIconBox({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View
      style={{
        width: 60,
        height: 60,
        borderRadius: 10,
        backgroundColor: '#D7E9FF',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </View>
  );
}

function GreenIconBox({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View
      style={{
        width: 60,
        height: 60,
        borderRadius: 10,
        backgroundColor: '#CFEFCD',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </View>
  );
}