import {
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Text } from '@/src/components/atoms/Text';
import { useTutor } from '@/src/hooks/useTutors';
import { Tutor } from '@/src/types/Tutor';

export default function TutorProfile() {
  const [tutorId, setTutorId] = useState(0);
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    async function carregarSessao() {
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

        setTutorId(tutorSalvo.id);
      } catch (error) {
        console.error(
          'Erro ao carregar sessão:',
          error
        );

        await AsyncStorage.removeItem('@vitalpet:tutor');
        router.replace('/tutor-login');
      } finally {
        setLoadingSession(false);
      }
    }

    carregarSessao();
  }, []);

  const {
    data: tutor,
    isLoading,
    isError,
    refetch,
  } = useTutor(tutorId);

  async function sair() {
    await AsyncStorage.removeItem('@vitalpet:tutor');

    router.replace('/tutor-login');
  }

  if (loadingSession || isLoading) {
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
          size={15}
          color="#7D7D7D"
          style={{
            marginTop: 12,
          }}
        >
          Carregando perfil...
        </Text>
      </View>
    );
  }

  if (isError || !tutor) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
        }}
      >
        <Text
          size={20}
          weight="700"
          color="#111827"
          align="center"
        >
          Não foi possível carregar seu perfil.
        </Text>

        <TouchableOpacity
          onPress={() => refetch()}
          style={{
            marginTop: 20,
            backgroundColor: '#0A66C2',
            paddingHorizontal: 22,
            paddingVertical: 12,
            borderRadius: 12,
          }}
        >
          <Text
            size={15}
            weight="700"
            color="#FFFFFF"
          >
            Tentar novamente
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            marginTop: 14,
          }}
        >
          <Text
            size={15}
            weight="700"
            color="#0A66C2"
          >
            Voltar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const inicial =
    tutor.nome?.trim().charAt(0).toUpperCase() || '?';

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
            paddingHorizontal: 24,
            paddingTop: 52,
            paddingBottom: 50,
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Text
              size={17}
              weight="700"
              color="#0A66C2"
            >
              ‹ Voltar
            </Text>
          </TouchableOpacity>

          <Text
            size={32}
            weight="700"
            color="#111827"
            style={{
              marginTop: 24,
            }}
          >
            Meu perfil
          </Text>

          <Text
            size={16}
            color="#7D7D7D"
            style={{
              marginTop: 6,
            }}
          >
            Seus dados cadastrados no VitalPet
          </Text>

          <View
            style={{
              backgroundColor: '#0A66C2',
              borderRadius: 22,
              padding: 22,
              marginTop: 26,
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: 72,
                height: 72,
                borderRadius: 36,
                backgroundColor: '#FFFFFF',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                size={30}
                weight="700"
                color="#0A66C2"
              >
                {inicial}
              </Text>
            </View>

            <Text
              size={22}
              weight="700"
              color="#FFFFFF"
              align="center"
              style={{
                marginTop: 14,
              }}
            >
              {tutor.nome}
            </Text>

            <Text
              size={14}
              weight="600"
              color="#DCEBFF"
              style={{
                marginTop: 5,
              }}
            >
              Tutor VitalPet
            </Text>
          </View>

          <Text
            size={20}
            weight="700"
            color="#111827"
            style={{
              marginTop: 30,
              marginBottom: 14,
            }}
          >
            Dados pessoais
          </Text>

          <InfoCard
            label="Nome completo"
            value={tutor.nome}
          />

          <InfoCard
            label="CPF"
            value={formatCpf(tutor.cpf)}
          />

          <InfoCard
            label="Email"
            value={tutor.email || 'Não informado'}
          />

          <InfoCard
            label="Telefone"
            value={
              tutor.telefone
                ? formatTelefone(tutor.telefone)
                : 'Não informado'
            }
          />

          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/tutor-edit',
                params: {
                  tutorId: String(tutor.id),
                },
              })
            }
            activeOpacity={0.85}
            style={{
              height: 58,
              borderRadius: 16,
              backgroundColor: '#0A66C2',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 24,
            }}
          >
            <Text
              size={17}
              weight="700"
              color="#FFFFFF"
            >
              Editar perfil
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/tutor-delete',
                params: {
                  tutorId: String(tutor.id),
                },
              })
            }
            activeOpacity={0.85}
            style={{
              height: 58,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: '#FCA5A5',
              backgroundColor: '#FFF5F5',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 12,
            }}
          >
            <Text
              size={17}
              weight="700"
              color="#EF4444"
            >
              Excluir conta
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={sair}
            activeOpacity={0.85}
            style={{
              height: 58,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: '#D1D5DB',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 12,
            }}
          >
            <Text
              size={17}
              weight="700"
              color="#111827"
            >
              Sair
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View
      style={{
        minHeight: 72,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 13,
        marginBottom: 10,
      }}
    >
      <Text
        size={13}
        weight="700"
        color="#7D7D7D"
      >
        {label}
      </Text>

      <Text
        size={16}
        weight="700"
        color="#111827"
        style={{
          marginTop: 5,
        }}
      >
        {value}
      </Text>
    </View>
  );
}

function formatCpf(cpf: string) {
  const numeros = cpf.replace(/\D/g, '');

  if (numeros.length !== 11) {
    return cpf;
  }

  return `${numeros.slice(0, 3)}.${numeros.slice(
    3,
    6
  )}.${numeros.slice(6, 9)}-${numeros.slice(9)}`;
}

function formatTelefone(telefone: string) {
  const numeros = telefone.replace(/\D/g, '');

  if (numeros.length === 11) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(
      2,
      7
    )}-${numeros.slice(7)}`;
  }

  if (numeros.length === 10) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(
      2,
      6
    )}-${numeros.slice(6)}`;
  }

  return telefone;
}
