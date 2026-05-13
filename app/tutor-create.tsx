import { View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text } from '@/src/components/atoms/Text';

export default function TutorCreate() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#FFFFFF' }}
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 34,
      }}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Text size={28} color="#111827">
          ‹
        </Text>
      </TouchableOpacity>

      <View style={{ alignItems: 'center', marginBottom: 22 }}>
        <Image
          source={require('@/assets/logos/logo-blue.svg')}
          style={{ width: 120, height: 80 }}
          resizeMode="contain"
        />
      </View>

      <Text size={30} weight="700" color="#111827">
        Criar sua conta
      </Text>

      <Text
        size={15}
        color="#6B7280"
        style={{ marginTop: 8, marginBottom: 24 }}
      >
        Preencha seus dados para começar sua jornada no VitalPet.
      </Text>

      <Input
        label="Nome Completo"
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />

      <Input
        label="CPF"
        placeholder="000.000.000-00"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />

      <Input
        label="Email"
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Input
        label="Senha"
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <Input
        label="Confirmar Senha"
        placeholder="Digite novamente"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
      />

      <TouchableOpacity
        onPress={() => router.push('/pet-form')}
        style={{
          height: 56,
          backgroundColor: '#0A66C2',
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 18,
        }}
      >
        <Text size={17} weight="700" color="#FFFFFF">
          Criar conta
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

type InputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: any;
  secureTextEntry?: boolean;
};

function Input({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  secureTextEntry,
}: InputProps) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text
        size={14}
        weight="600"
        color="#111827"
        style={{ marginBottom: 8 }}
      >
        {label}
      </Text>

      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        style={{
          height: 54,
          borderWidth: 1,
          borderColor: '#D1D5DB',
          borderRadius: 14,
          paddingHorizontal: 16,
          fontSize: 16,
        }}
      />
    </View>
  );
}