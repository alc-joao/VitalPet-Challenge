import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Text } from '@/src/components/atoms/Text';
import {
  useTutor,
  useUpdateTutor,
} from '@/src/hooks/useTutors';

export default function TutorEdit() {
  const params = useLocalSearchParams();

  const tutorId = Number(params.tutorId);

  const {
    data: tutor,
    isLoading,
    isError,
    refetch,
  } = useTutor(tutorId);

  const updateTutorMutation = useUpdateTutor();

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  useEffect(() => {
    if (!tutor) {
      return;
    }

    setNome(tutor.nome || '');
    setCpf(formatCpf(tutor.cpf || ''));
    setEmail(tutor.email || '');
    setTelefone(formatTelefone(tutor.telefone || ''));
  }, [tutor]);

  function handleCpfChange(value: string) {
    const numeros = value
      .replace(/\D/g, '')
      .slice(0, 11);

    let formatado = numeros;

    if (numeros.length > 3) {
      formatado =
        numeros.slice(0, 3) +
        '.' +
        numeros.slice(3);
    }

    if (numeros.length > 6) {
      formatado =
        numeros.slice(0, 3) +
        '.' +
        numeros.slice(3, 6) +
        '.' +
        numeros.slice(6);
    }

    if (numeros.length > 9) {
      formatado =
        numeros.slice(0, 3) +
        '.' +
        numeros.slice(3, 6) +
        '.' +
        numeros.slice(6, 9) +
        '-' +
        numeros.slice(9);
    }

    setCpf(formatado);
  }

  function handleTelefoneChange(value: string) {
    const numeros = value
      .replace(/\D/g, '')
      .slice(0, 11);

    let formatado = numeros;

    if (numeros.length > 2) {
      formatado =
        '(' +
        numeros.slice(0, 2) +
        ') ' +
        numeros.slice(2);
    }

    if (numeros.length > 7) {
      formatado =
        '(' +
        numeros.slice(0, 2) +
        ') ' +
        numeros.slice(2, 7) +
        '-' +
        numeros.slice(7);
    }

    setTelefone(formatado);
  }

  async function salvar() {
    const nomeLimpo = nome.trim();
    const cpfNumeros = cpf.replace(/\D/g, '');
    const emailLimpo = email.trim();
    const telefoneNumeros =
      telefone.replace(/\D/g, '');

    if (nomeLimpo.length < 3) {
      Alert.alert(
        'Nome inválido',
        'Informe um nome válido.'
      );
      return;
    }

    if (cpfNumeros.length !== 11) {
      Alert.alert(
        'CPF inválido',
        'O CPF precisa ter 11 números.'
      );
      return;
    }

    if (
      !emailLimpo.includes('@') ||
      !emailLimpo.includes('.')
    ) {
      Alert.alert(
        'Email inválido',
        'Informe um email válido.'
      );
      return;
    }

    if (telefoneNumeros.length < 10) {
      Alert.alert(
        'Telefone inválido',
        'Informe um telefone válido.'
      );
      return;
    }

    try {
      const tutorAtualizado =
        await updateTutorMutation.mutateAsync({
          id: tutorId,
          tutor: {
            nome: nomeLimpo,
            cpf: cpfNumeros,
            email: emailLimpo,
            telefone: telefoneNumeros,
          },
        });

      await AsyncStorage.setItem(
        '@vitalpet:tutor',
        JSON.stringify(tutorAtualizado)
      );

      await AsyncStorage.setItem(
        '@vitalpet:lastCpf',
        tutorAtualizado.cpf
      );

      Alert.alert(
        'Perfil atualizado',
        'Seus dados foram atualizados com sucesso.',
        [
          {
            text: 'OK',
            onPress: () =>
              router.replace('/tutor-profile'),
          },
        ]
      );
    } catch (error: any) {
      console.error(
        'Erro ao atualizar tutor:',
        error
      );

      const campos =
        error?.response?.data?.campos;

      if (campos) {
        const mensagem = Object.entries(campos)
          .map(
            ([campo, mensagem]) =>
              `${campo}: ${mensagem}`
          )
          .join('\n');

        Alert.alert(
          'Dados inválidos',
          mensagem
        );

        return;
      }

      Alert.alert(
        'Erro',
        'Não foi possível atualizar o perfil.'
      );
    }
  }

  if (!tutorId) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
          padding: 24,
        }}
      >
        <Text
          size={18}
          weight="700"
          color="#111827"
        >
          Tutor inválido.
        </Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
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
          Carregando dados...
        </Text>
      </View>
    );
  }

  if (isError || !tutor) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
          padding: 24,
        }}
      >
        <Text
          size={20}
          weight="700"
          color="#111827"
          align="center"
        >
          Não foi possível carregar o tutor.
        </Text>

        <TouchableOpacity
          onPress={() => refetch()}
          style={{
            marginTop: 20,
            backgroundColor: '#0A66C2',
            paddingHorizontal: 20,
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
      </View>
    );
  }

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
        }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 52,
            paddingBottom: 50,
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
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
            Editar perfil
          </Text>

          <Text
            size={16}
            color="#7D7D7D"
            style={{
              marginTop: 6,
              marginBottom: 26,
            }}
          >
            Atualize seus dados pessoais
          </Text>

          <Field
            label="Nome completo"
            value={nome}
            onChangeText={setNome}
            placeholder="Seu nome"
          />

          <Field
            label="CPF"
            value={cpf}
            onChangeText={handleCpfChange}
            placeholder="000.000.000-00"
            keyboardType="numeric"
          />

          <Field
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="email@exemplo.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Field
            label="Telefone"
            value={telefone}
            onChangeText={handleTelefoneChange}
            placeholder="(11) 99999-9999"
            keyboardType="phone-pad"
          />

          <TouchableOpacity
            onPress={salvar}
            disabled={
              updateTutorMutation.isPending
            }
            activeOpacity={0.85}
            style={{
              height: 58,
              borderRadius: 16,
              backgroundColor:
                updateTutorMutation.isPending
                  ? '#8AB7E3'
                  : '#0A66C2',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 16,
            }}
          >
            {updateTutorMutation.isPending ? (
              <ActivityIndicator
                color="#FFFFFF"
              />
            ) : (
              <Text
                size={17}
                weight="700"
                color="#FFFFFF"
              >
                Salvar alterações
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  autoCapitalize,
}: any) {
  return (
    <View
      style={{
        marginBottom: 16,
      }}
    >
      <Text
        size={14}
        weight="700"
        color="#111827"
        style={{
          marginBottom: 8,
        }}
      >
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={
          autoCapitalize || 'sentences'
        }
        style={{
          height: 56,
          borderWidth: 1,
          borderColor: '#D1D5DB',
          borderRadius: 14,
          paddingHorizontal: 16,
          fontSize: 16,
          color: '#111827',
          backgroundColor: '#FFFFFF',
        }}
      />
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
  const numeros =
    telefone.replace(/\D/g, '');

  if (numeros.length === 11) {
    return `(${numeros.slice(
      0,
      2
    )}) ${numeros.slice(
      2,
      7
    )}-${numeros.slice(7)}`;
  }

  if (numeros.length === 10) {
    return `(${numeros.slice(
      0,
      2
    )}) ${numeros.slice(
      2,
      6
    )}-${numeros.slice(6)}`;
  }

  return telefone;
}
