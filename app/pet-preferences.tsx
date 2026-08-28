import {
  View,
  TouchableOpacity,
  Switch,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {
  router,
  useLocalSearchParams,
} from 'expo-router';

import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Text } from '@/src/components/atoms/Text';
import { useCreatePet } from '@/src/hooks/usePets';
import { Tutor } from '@/src/types/Tutor';

import IconBell from '@/assets/icons/icon-bell.svg';
import IconWhatsapp from '@/assets/icons/icon-whatsapp.svg';
import IconEmail from '@/assets/icons/icon-email.svg';

import IconVaccine from '@/assets/icons/icon-vaccine.svg';
import IconConsult from '@/assets/icons/icon-consult.svg';
import IconMedicine from '@/assets/icons/icon-medicine.svg';
import IconWorm from '@/assets/icons/icon-worm.svg';

export default function PetPreferences() {
  const params = useLocalSearchParams<{
    nome?: string;
    especie?: string;
    raca?: string;
    dataNascimento?: string;

    peso?: string;
    sexo?: 'MACHO' | 'FEMEA';

    porte?: string;
    condicao?: string;
  }>();

  const [notificacao, setNotificacao] =
    useState(true);

  const [whatsapp, setWhatsapp] =
    useState(true);

  const [email, setEmail] =
    useState(true);

  const [vacinas, setVacinas] =
    useState(true);

  const [consulta, setConsulta] =
    useState(true);

  const [medicamentos, setMedicamentos] =
    useState(true);

  const [vermifugos, setVermifugos] =
    useState(false);

  const createPetMutation = useCreatePet();

  async function salvarPet() {
    if (
      !params.nome ||
      !params.especie ||
      !params.raca ||
      !params.dataNascimento ||
      !params.peso ||
      !params.sexo
    ) {
      Alert.alert(
        'Dados incompletos',
        'Não foi possível recuperar todas as informações do pet. Volte e preencha o cadastro novamente.'
      );

      return;
    }

    const pesoNumero = Number(params.peso);

    if (
      Number.isNaN(pesoNumero) ||
      pesoNumero <= 0
    ) {
      Alert.alert(
        'Peso inválido',
        'O peso informado não é válido.'
      );

      return;
    }

    try {
      const storedTutor =
        await AsyncStorage.getItem(
          '@vitalpet:tutor'
        );

      if (!storedTutor) {
        Alert.alert(
          'Sessão não encontrada',
          'Entre novamente como tutor para cadastrar o pet.'
        );

        router.replace('/tutor-login');

        return;
      }

      const tutor: Tutor =
        JSON.parse(storedTutor);

      if (!tutor.id) {
        Alert.alert(
          'Tutor inválido',
          'Não foi possível identificar o tutor logado.'
        );

        return;
      }

      const observacoes = [
        params.porte
          ? `Porte: ${params.porte}.`
          : null,

        params.condicao
          ? `Condição especial: ${params.condicao}.`
          : null,
      ]
        .filter(Boolean)
        .join(' ');

      await createPetMutation.mutateAsync({
        nome: params.nome,
        especie: params.especie,
        raca: params.raca,
        dataNascimento:
          params.dataNascimento,
        sexo: params.sexo,
        peso: pesoNumero,
        observacoes:
          observacoes || undefined,
        tutorId: tutor.id,
      });

      router.replace('/pet-success');
    } catch (error) {
      console.error(
        'Erro ao cadastrar pet:',
        error
      );

      Alert.alert(
        'Erro ao cadastrar pet',
        'Não foi possível salvar o pet. Verifique se a API Java está rodando e tente novamente.'
      );
    }
  }

  const salvando =
    createPetMutation.isPending;

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}
      contentContainerStyle={{
        paddingHorizontal: 36,
        paddingTop: 60,
        paddingBottom: 34,
      }}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        disabled={salvando}
      >
        <Text
          size={40}
          color="#111827"
        >
          ‹
        </Text>
      </TouchableOpacity>

      <Text
        size={30}
        weight="700"
        color="#111827"
        style={{
          marginTop: 34,
        }}
      >
        Preferências e{'\n'}lembretes
      </Text>

      <Text
        size={18}
        color="#444"
        style={{
          marginTop: 10,
          marginBottom: 38,
        }}
      >
        Escolha como deseja receber{'\n'}
        lembretes e alertas importantes
      </Text>

      <Text
        size={22}
        weight="700"
        color="#111827"
        style={{
          marginBottom: 24,
        }}
      >
        Receber lembretes por
      </Text>

      <Option
        icon={
          <IconBell
            width={26}
            height={26}
          />
        }
        label="Notificações"
        description="Recomendado"
        value={notificacao}
        onValueChange={setNotificacao}
      />

      <Option
        icon={
          <IconWhatsapp
            width={26}
            height={26}
          />
        }
        label="WhatsApp"
        value={whatsapp}
        onValueChange={setWhatsapp}
      />

      <Option
        icon={
          <IconEmail
            width={26}
            height={26}
          />
        }
        label="E-mail"
        value={email}
        onValueChange={setEmail}
      />

      <Text
        size={22}
        weight="700"
        color="#111827"
        style={{
          marginTop: 20,
          marginBottom: 24,
        }}
      >
        Lembretes para
      </Text>

      <Option
        icon={
          <IconVaccine
            width={26}
            height={26}
          />
        }
        label="Vacinas"
        value={vacinas}
        onValueChange={setVacinas}
      />

      <Option
        icon={
          <IconConsult
            width={26}
            height={26}
          />
        }
        label="Consulta"
        value={consulta}
        onValueChange={setConsulta}
      />

      <Option
        icon={
          <IconMedicine
            width={26}
            height={26}
          />
        }
        label="Medicamentos"
        value={medicamentos}
        onValueChange={setMedicamentos}
      />

      <Option
        icon={
          <IconWorm
            width={26}
            height={26}
          />
        }
        label="Vermífugos"
        value={vermifugos}
        onValueChange={setVermifugos}
      />

      <TouchableOpacity
        onPress={salvarPet}
        disabled={salvando}
        activeOpacity={0.85}
        style={{
          height: 64,
          backgroundColor: salvando
            ? '#78A9DC'
            : '#0A66C2',
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 32,
        }}
      >
        {salvando ? (
          <ActivityIndicator
            size="small"
            color="#FFFFFF"
          />
        ) : (
          <Text
            size={22}
            weight="700"
            color="#FFFFFF"
          >
            Salvar e continuar
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

type OptionProps = {
  icon: React.ReactNode;
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (
    value: boolean
  ) => void;
};

function Option({
  icon,
  label,
  description,
  value,
  onValueChange,
}: OptionProps) {
  return (
    <View
      style={{
        minHeight: 64,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:
          'space-between',
        marginBottom: 8,
      }}
    >
      <View
        style={{
          width: 44,
          alignItems: 'center',
          marginRight: 24,
        }}
      >
        {icon}
      </View>

      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          size={20}
          weight="700"
          color="#111827"
        >
          {label}
        </Text>

        {description && (
          <Text
            size={16}
            color="#6B7280"
            style={{
              marginTop: 4,
            }}
          >
            {description}
          </Text>
        )}
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: '#8E8E93',
          true: '#0A66C2',
        }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#8E8E93"
      />
    </View>
  );
}