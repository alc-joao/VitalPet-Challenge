import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text } from '@/src/components/atoms/Text';

import LogoIconBlue from '@/assets/logos/logo-icon-blue.svg';
import CheckIcon from '@/assets/icons/check-green.svg';
import EyeOpen from '@/assets/icons/eye-open.svg';
import EyeClosed from '@/assets/icons/eye-closed.svg';

export default function TutorCreate() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);

  const nomeValido = nome.trim().length >= 3;
  const cpfNumeros = cpf.replace(/\D/g, '');
  const cpfValido = cpfNumeros.length === 11;
  const emailValido = email.includes('@') && email.includes('.');
  const senhaValida = senha.length >= 6;
  const confirmarSenhaValida =
    confirmarSenha.length >= 6 && senha === confirmarSenha;

  const formatCPF = (value: string) => {
    const numericValue = value.replace(/\D/g, '').slice(0, 11);

    if (numericValue.length <= 3) return numericValue;
    if (numericValue.length <= 6)
      return `${numericValue.slice(0, 3)}.${numericValue.slice(3)}`;
    if (numericValue.length <= 9)
      return `${numericValue.slice(0, 3)}.${numericValue.slice(
        3,
        6
      )}.${numericValue.slice(6)}`;

    return `${numericValue.slice(0, 3)}.${numericValue.slice(
      3,
      6
    )}.${numericValue.slice(6, 9)}-${numericValue.slice(9, 11)}`;
  };

  function handleCreateAccount() {
    if (!nomeValido) {
      Alert.alert(
        'Nome incompleto',
        'Digite seu nome completo com pelo menos 3 letras.'
      );
      return;
    }

    if (!cpfValido) {
      Alert.alert(
        'CPF incompleto',
        'Digite um CPF válido com 11 números.'
      );
      return;
    }

    if (!emailValido) {
      Alert.alert(
        'Email inválido',
        'Digite um email válido para continuar.'
      );
      return;
    }

    if (!senhaValida) {
      Alert.alert(
        'Senha inválida',
        'A senha precisa ter pelo menos 6 caracteres.'
      );
      return;
    }

    if (!confirmarSenhaValida) {
      Alert.alert(
        'Senhas diferentes',
        'A confirmação de senha precisa ser igual à senha.'
      );
      return;
    }

    router.push('/pet-form');
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#FCFCFC' }}
      contentContainerStyle={{
        paddingHorizontal: 28,
        paddingTop: 68,
        paddingBottom: 26,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ alignItems: 'center', marginBottom: 56 }}>
        <LogoIconBlue width={90} height={90} />
      </View>

      <Text size={30} weight="700" color="#111827">
        Criar sua Conta
      </Text>

      <Text
        size={17}
        color="#111827"
        style={{ marginTop: 12, lineHeight: 21, marginBottom: 24 }}
      >
        Preencha seus dados pra{'\n'}começar a cuidar do seu pet.
      </Text>

      <Input
        label="Nome Completo"
        value={nome}
        onChangeText={setNome}
        placeholder="Seu nome"
        showCheck={nomeValido}
      />

      <Input
        label="CPF"
        value={cpf}
        onChangeText={(text) => setCpf(formatCPF(text))}
        placeholder="000.000.000-00"
        keyboardType="numeric"
        showCheck={cpfValido}
      />

      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Seu email"
        keyboardType="email-address"
        showCheck={emailValido}
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

      <Input
        label="Confirma Senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        placeholder="••••••••"
        secureTextEntry={!showConfirmarSenha}
        eyeIcon
        onToggleEye={() => setShowConfirmarSenha(!showConfirmarSenha)}
        showEye={showConfirmarSenha}
      />

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handleCreateAccount}
        style={{
          height: 60,
          backgroundColor: '#0A66C2',
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 14,
        }}
      >
        <Text size={21} weight="700" color="#FFFFFF">
          Criar conta
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push('/tutor-login')}
        style={{ alignItems: 'center', marginTop: 28 }}
      >
        <Text size={16} weight="700" color="#111827">
          Já tem conta?{' '}
          <Text size={16} weight="700" color="#0A66C2">
            Entre
          </Text>
        </Text>
      </TouchableOpacity>

      <Text
        size={16}
        weight="700"
        color="#8A8A8A"
        align="center"
        style={{ marginTop: 48, lineHeight: 22 }}
      >
        Ao continuar você concorda com nossos{'\n'}
        <Text size={16} weight="700" color="#0A66C2">
          Termos de Serviço
        </Text>{' '}
        e{' '}
        <Text size={16} weight="700" color="#0A66C2">
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
    <View style={{ marginBottom: 18 }}>
      <Text size={16} weight="700" color="#111827" style={{ marginBottom: 8 }}>
        {label}
      </Text>

      <View
        style={{
          height: 52,
          borderWidth: 1.3,
          borderColor: '#C7C7C7',
          borderRadius: 12,
          backgroundColor: '#FFFFFF',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
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
            fontSize: 18,
            fontWeight: '600',
            color: '#777777',
          }}
        />

        {showCheck && <CheckIcon width={22} height={22} />}

        {eyeIcon && (
          <TouchableOpacity onPress={onToggleEye}>
            {showEye ? (
              <EyeOpen width={22} height={22} />
            ) : (
              <EyeClosed width={22} height={22} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}