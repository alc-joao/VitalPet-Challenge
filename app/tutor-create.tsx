import { View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text } from '@/src/components/atoms/Text';

export default function TutorCreate() {
  const [nome, setNome] = useState('João Victor');
  const [cpf, setCpf] = useState('000.000.000-00');
  const [email, setEmail] = useState('joao@gmail.com');
  const [senha, setSenha] = useState('');

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
      <View style={{ alignItems: 'center', marginBottom: 24 }}>
        <Image
          source={require('@/assets/logos/logo-blue.svg')}
          style={{ width: 120, height: 80 }}
          resizeMode="contain"
        />
      </View>

      <Text size={28} weight="700" color="#111827">
        Criar sua Conta
      </Text>

      <Text size={15} color="#6B7280" style={{ marginTop: 8, marginBottom: 22 }}>
        Preencha seus dados pra começar a cuidar do seu pet.
      </Text>

      <Input label="Nome Completo" value={nome} onChangeText={setNome} />
      <Input label="CPF" value={cpf} onChangeText={setCpf} />
      <Input label="Email" value={email} onChangeText={setEmail} />
      <Input label="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
      <Input label="Confirme Senha" value={senha} onChangeText={setSenha} secureTextEntry />

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

function Input(props: any) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text size={14} weight="600" color="#111827" style={{ marginBottom: 6 }}>
        {props.label}
      </Text>

      <TextInput
        {...props}
        placeholderTextColor="#9CA3AF"
        style={{
          height: 52,
          borderWidth: 1,
          borderColor: '#D1D5DB',
          borderRadius: 12,
          paddingHorizontal: 14,
          fontSize: 15,
        }}
      />
    </View>
  );
}