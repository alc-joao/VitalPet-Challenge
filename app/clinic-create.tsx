import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from '@/src/components/atoms/Text';

import LogoIconBlue from '@/assets/logos/logo-icon-blue.svg';
import CheckIcon from '@/assets/icons/check-green.svg';
import EyeClosed from '@/assets/icons/eye-closed.svg';
import EyeOpen from '@/assets/icons/eye-open.svg';

export default function ClinicCreate() {
  const [nomeClinica, setNomeClinica] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [email, setEmail] = useState('');
  const [crmv, setCrmv] = useState('');
  const [senha, setSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);

  const nomeClinicaValido = nomeClinica.trim().length >= 3;
  const cnpjNumeros = cnpj.replace(/\D/g, '');
  const cnpjValido = cnpjNumeros.length === 14;
  const responsavelValido = responsavel.trim().length >= 3;
  const emailValido = email.includes('@') && email.includes('.');
  const crmvValido = crmv.trim().length >= 6;
  const senhaValida = senha.length >= 6;

  const formatCNPJ = (value: string) => {
    const numericValue = value.replace(/\D/g, '').slice(0, 14);

    if (numericValue.length <= 2) return numericValue;
    if (numericValue.length <= 5) {
      return `${numericValue.slice(0, 2)}.${numericValue.slice(2)}`;
    }
    if (numericValue.length <= 8) {
      return `${numericValue.slice(0, 2)}.${numericValue.slice(
        2,
        5
      )}.${numericValue.slice(5)}`;
    }
    if (numericValue.length <= 12) {
      return `${numericValue.slice(0, 2)}.${numericValue.slice(
        2,
        5
      )}.${numericValue.slice(5, 8)}/${numericValue.slice(8)}`;
    }

    return `${numericValue.slice(0, 2)}.${numericValue.slice(
      2,
      5
    )}.${numericValue.slice(5, 8)}/${numericValue.slice(
      8,
      12
    )}-${numericValue.slice(12, 14)}`;
  };

  async function handleCreateClinic() {
    if (!nomeClinicaValido) {
      Alert.alert('Nome incompleto', 'Digite o nome da clínica.');
      return;
    }

    if (!cnpjValido) {
      Alert.alert('CNPJ incompleto', 'Digite um CNPJ válido com 14 números.');
      return;
    }

    if (!responsavelValido) {
      Alert.alert('Responsável incompleto', 'Digite o nome do responsável.');
      return;
    }

    if (!emailValido) {
      Alert.alert('Email inválido', 'Digite um email corporativo válido.');
      return;
    }

    if (!crmvValido) {
      Alert.alert('CRMV inválido', 'Digite o CRMV ou registro da clínica.');
      return;
    }

    if (!senhaValida) {
      Alert.alert('Senha inválida', 'A senha precisa ter pelo menos 6 caracteres.');
      return;
    }

    const clinicData = {
      nomeClinica: nomeClinica.trim(),
      cnpj,
      responsavel: responsavel.trim(),
      email: email.trim(),
      crmv: crmv.trim(),
    };

    await AsyncStorage.setItem('@vitalpet:clinic', JSON.stringify(clinicData));
    await AsyncStorage.setItem('@vitalpet:lastClinicCnpj', cnpj);

    Alert.alert('Conta criada!', 'Os dados da clínica foram salvos.');

    router.push('/clinic-home');
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#FCFCFC' }}
      contentContainerStyle={{
        paddingHorizontal: 28,
        paddingTop: 54,
        paddingBottom: 24,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ alignItems: 'center', marginBottom: 24 }}>
        <LogoIconBlue width={72} height={72} />
      </View>

      <Text size={28} weight="700" color="#111827">
        Criar sua Conta
      </Text>

      <Text
        size={16}
        color="#111827"
        style={{
          marginTop: 8,
          lineHeight: 19,
          marginBottom: 18,
        }}
      >
        Preencha seus dados pra{'\n'}começar a cuidar do seu pet.
      </Text>

      <Input
        label="Nome da Clínica"
        value={nomeClinica}
        onChangeText={setNomeClinica}
        placeholder="Ex: PetSave"
        showCheck={nomeClinicaValido}
      />

      <Input
        label="CNPJ"
        value={cnpj}
        onChangeText={(text) => setCnpj(formatCNPJ(text))}
        placeholder="00.000.000/0000-00"
        keyboardType="numeric"
        showCheck={cnpjValido}
      />

      <Input
        label="Nome do Responsável"
        value={responsavel}
        onChangeText={setResponsavel}
        placeholder="Seu Nome"
        showCheck={responsavelValido}
      />

      <Input
        label="Email Corporativo"
        value={email}
        onChangeText={setEmail}
        placeholder="Ex: contato@petsave.com"
        keyboardType="email-address"
        showCheck={emailValido}
      />

      <Input
        label="CRMV / Registro"
        value={crmv}
        onChangeText={setCrmv}
        placeholder="Ex: CRMV-SP 12345"
        showCheck={crmvValido}
      />

      <Input
        label="Senha"
        value={senha}
        onChangeText={setSenha}
        placeholder="••••••••"
        secureTextEntry={!showSenha}
        eyeIcon
        onToggleEye={() => setShowSenha(!showSenha)}
        showEye={showSenha}
      />

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handleCreateClinic}
        style={{
          height: 56,
          backgroundColor: '#0A66C2',
          borderRadius: 14,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}
      >
        <Text size={19} weight="700" color="#FFFFFF">
          Criar conta
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push('/clinic-login')}
        style={{ alignItems: 'center', marginTop: 20 }}
      >
        <Text size={15} weight="700" color="#111827">
          Já tem conta?{' '}
          <Text size={15} weight="700" color="#0A66C2">
            Entre
          </Text>
        </Text>
      </TouchableOpacity>

      <Text
        size={14}
        weight="700"
        color="#8A8A8A"
        align="center"
        style={{ marginTop: 34, lineHeight: 19 }}
      >
        Ao continuar você concorda com nossos{'\n'}
        <Text size={14} weight="700" color="#0A66C2">
          Termos de Serviço
        </Text>{' '}
        e{' '}
        <Text size={14} weight="700" color="#0A66C2">
          Política de Privacidade.
        </Text>
      </Text>
    </ScrollView>
  );
}

type InputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: any;
  secureTextEntry?: boolean;
  showCheck?: boolean;
  eyeIcon?: boolean;
  onToggleEye?: () => void;
  showEye?: boolean;
};

function Input({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  secureTextEntry,
  showCheck,
  eyeIcon,
  onToggleEye,
  showEye,
}: InputProps) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text size={14} weight="700" color="#111827" style={{ marginBottom: 6 }}>
        {label}
      </Text>

      <View
        style={{
          height: 48,
          borderWidth: 1.2,
          borderColor: '#C7C7C7',
          borderRadius: 10,
          backgroundColor: '#FFFFFF',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 14,
        }}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#777777"
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          style={{
            flex: 1,
            fontSize: 16,
            fontWeight: '600',
            color: '#777777',
          }}
        />

        {showCheck && <CheckIcon width={18} height={18} />}

        {eyeIcon && (
          <TouchableOpacity onPress={onToggleEye}>
            {showEye ? (
              <EyeOpen width={20} height={20} />
            ) : (
              <EyeClosed width={20} height={20} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}