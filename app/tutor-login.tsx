import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text } from '@/src/components/atoms/Text';

export default function TutorLogin() {
  const [cpf, setCpf] = useState('');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
        paddingTop: 70,
        paddingBottom: 34,
      }}
    >
      <View style={{ alignItems: 'center', marginBottom: 34 }}>
        <Image
          source={require('@/assets/logos/logo-blue.svg')}
          style={{ width: 150, height: 90 }}
          resizeMode="contain"
        />
      </View>

      <Text size={30} weight="700" color="#111827">
        Cuide melhor{'\n'}do seu pet com{'\n'}VitalPet
      </Text>

      <Text size={15} color="#6B7280" style={{ marginTop: 10, marginBottom: 32 }}>
        Acompanhe a saúde, vacinas, consultas e alertas em um só lugar.
      </Text>

      <Text size={15} weight="600" color="#111827" style={{ marginBottom: 8 }}>
        CPF
      </Text>

      <TextInput
        placeholder="000.000.000-00"
        placeholderTextColor="#9CA3AF"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
        style={{
          height: 56,
          borderWidth: 1,
          borderColor: '#D1D5DB',
          borderRadius: 14,
          paddingHorizontal: 16,
          fontSize: 16,
        }}
      />

      <View
        style={{
          backgroundColor: '#DCEEFF',
          borderRadius: 16,
          padding: 16,
          marginTop: 24,
        }}
      >
        <Text size={14} color="#0A66C2" weight="600" align="center">
          Utilizamos seu CPF para garantir mais segurança e personalizar sua experiência.
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push('/tutor-create')}
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
          Entrar como Tutor
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push('/tutor-create')}
        style={{ alignItems: 'center', marginTop: 'auto' }}
      >
        <Text size={15} color="#0A66C2" weight="600">
          Ainda não tem conta? inscrever-se
        </Text>
      </TouchableOpacity>
    </View>
  );
}