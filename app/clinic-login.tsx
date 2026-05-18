import { View, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from '@/src/components/atoms/Text';

import LogoBlue from '@/assets/logos/logo-blue.svg';
import ClinicIcon from '@/assets/icons/profile-clinic.svg';
import SecurityLock from '@/assets/icons/security-lock.svg';
import ShieldIcon from '@/assets/icons/shield.svg';
import GoogleIcon from '@/assets/icons/google.svg';
import EyeClosed from '@/assets/icons/eye-closed.svg';

export default function ClinicLogin() {
  const [cnpj, setCnpj] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    async function loadClinicData() {
      const savedCnpj = await AsyncStorage.getItem('@vitalpet:lastClinicCnpj');

      if (savedCnpj) {
        setCnpj(savedCnpj);
      }
    }

    loadClinicData();
  }, []);

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

  async function handleClinicLogin() {
    await AsyncStorage.setItem('@vitalpet:lastClinicCnpj', cnpj);
    router.push('/clinic-home');
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FCFCFC',
        paddingHorizontal: 28,
        paddingTop: 20,
        paddingBottom: 26,
      }}
    >
      <View style={{ alignItems: 'center', marginBottom: 22 }}>
        <LogoBlue width={170} height={110} />
      </View>

      <Text
        size={30}
        weight="700"
        color="#111827"
        style={{
          lineHeight: 34,
          marginBottom: 8,
        }}
      >
        Gerencie sua{'\n'}clínica com o{'\n'}VitalPet
      </Text>

      <Text
        size={16}
        color="#111827"
        style={{
          lineHeight: 21,
          marginBottom: 22,
        }}
      >
        Centralize pacientes, agendamentos,{'\n'}alertas e retenção em um só lugar
      </Text>

      <Text size={15} weight="700" color="#111827" style={{ marginBottom: 8 }}>
        CNPJ
      </Text>

      <TextInput
        placeholder="000.000.000-00"
        placeholderTextColor="#8C8C8C"
        keyboardType="numeric"
        value={cnpj}
        onChangeText={(text) => setCnpj(formatCNPJ(text))}
        style={{
          height: 52,
          borderWidth: 1.2,
          borderColor: '#BDBDBD',
          borderRadius: 12,
          paddingHorizontal: 16,
          fontSize: 16,
          fontWeight: '600',
          color: '#111827',
          backgroundColor: '#FFFFFF',
          marginBottom: 14,
        }}
      />

      <Text size={15} weight="700" color="#111827" style={{ marginBottom: 8 }}>
        Senha
      </Text>

      <View
        style={{
          height: 52,
          borderWidth: 1.2,
          borderColor: '#BDBDBD',
          borderRadius: 12,
          paddingHorizontal: 16,
          backgroundColor: '#FFFFFF',
          marginBottom: 16,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TextInput
          placeholder="••••••••"
          placeholderTextColor="#8C8C8C"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          style={{
            flex: 1,
            fontSize: 16,
            fontWeight: '600',
            color: '#111827',
          }}
        />

        <EyeClosed width={20} height={20} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <ShieldIcon width={21} height={21} />

        <Text
          size={14}
          weight="600"
          color="#7A7A7A"
          style={{ marginLeft: 10 }}
        >
          Seus dados estão protegidos e seguros.
        </Text>
      </View>

      <View
        style={{
          backgroundColor: '#DCEBFA',
          borderRadius: 14,
          paddingVertical: 14,
          paddingHorizontal: 18,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 18,
        }}
      >
        <SecurityLock width={30} height={30} />

        <Text
          size={14}
          weight="700"
          color="#0A66C2"
          style={{
            flex: 1,
            marginLeft: 18,
            lineHeight: 20,
          }}
        >
          Utilizamos seu CNPJ pra garantir mais segurança e personalizar sua experiência.
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handleClinicLogin}
        style={{
          height: 58,
          backgroundColor: '#0A66C2',
          borderRadius: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 22,
        }}
      >
        <ClinicIcon width={28} height={28} />

        <Text
          size={19}
          weight="700"
          color="#FFFFFF"
          style={{ marginLeft: 14 }}
        >
          Entrar como Clínica
        </Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 22,
        }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: '#8D8D8D' }} />

        <Text
          size={15}
          weight="600"
          color="#7B7B7B"
          style={{ marginHorizontal: 14 }}
        >
          Ou
        </Text>

        <View style={{ flex: 1, height: 1, backgroundColor: '#8D8D8D' }} />
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handleClinicLogin}
        style={{
          height: 52,
          borderWidth: 1.3,
          borderColor: '#C9C9C9',
          borderRadius: 14,
          backgroundColor: '#FFFFFF',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
        }}
      >
        <GoogleIcon width={26} height={26} />

        <Text
          size={17}
          weight="700"
          color="#111827"
          style={{ marginLeft: 14 }}
        >
          Continue com Google Workspace
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push('/clinic-create')}
        style={{
          alignItems: 'center',
          marginTop: 4,
        }}
      >
        <Text size={14} weight="700" color="#111827">
          Ainda não tem conta?{' '}
          <Text size={14} weight="700" color="#0A66C2">
            inscrever-se
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}