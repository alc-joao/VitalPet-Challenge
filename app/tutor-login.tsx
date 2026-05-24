import { View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from '@/src/components/atoms/Text';

import LogoBlue from '@/assets/logos/logo-blue.svg';
import TutorIcon from '@/assets/icons/profile-tutor-white.svg';
import SecurityLock from '@/assets/icons/security-lock.svg';
import ShieldIcon from '@/assets/icons/shield.svg';
import GoogleIcon from '@/assets/icons/google.svg';
import AppleIcon from '@/assets/icons/apple.svg';

export default function TutorLogin() {
  const [cpf, setCpf] = useState('');

  useEffect(() => {
    async function loadStoredCPF() {
      const storedTutor = await AsyncStorage.getItem('@vitalpet:tutor');
      const lastCpf = await AsyncStorage.getItem('@vitalpet:lastCpf');

      if (storedTutor) {
        const tutor = JSON.parse(storedTutor);
        setCpf(tutor.cpf || '');
        return;
      }

      if (lastCpf) setCpf(lastCpf);
    }

    loadStoredCPF();
  }, []);

  const formatCPF = (value: string) => {
    const numericValue = value.replace(/\D/g, '').slice(0, 11);

    if (numericValue.length <= 3) return numericValue;
    if (numericValue.length <= 6) return `${numericValue.slice(0, 3)}.${numericValue.slice(3)}`;
    if (numericValue.length <= 9) {
      return `${numericValue.slice(0, 3)}.${numericValue.slice(3, 6)}.${numericValue.slice(6)}`;
    }

    return `${numericValue.slice(0, 3)}.${numericValue.slice(3, 6)}.${numericValue.slice(
      6,
      9
    )}-${numericValue.slice(9, 11)}`;
  };

  async function handleTutorLogin() {
    await AsyncStorage.setItem('@vitalpet:lastCpf', cpf);
    router.push('/tutor-home');
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#FCFCFC' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 28,
          paddingTop: 14,
          paddingBottom: 24,
        }}
      >
        <View style={{ alignItems: 'center', marginBottom: 14 }}>
          <LogoBlue width={130} height={72} />
        </View>

        <Text
          size={28}
          weight="700"
          color="#111827"
          style={{
            lineHeight: 32,
            marginBottom: 8,
          }}
        >
          Cuide melhor{'\n'}do seu pet com{'\n'}VitalPet
        </Text>

        <Text
          size={16}
          color="#111827"
          style={{
            lineHeight: 19,
            marginBottom: 18,
          }}
        >
          Acompanhe a saúde, vacinas,{'\n'}consultas e alertas e um só lugar.
        </Text>

        <Text size={15} weight="600" color="#111827" style={{ marginBottom: 8 }}>
          CPF
        </Text>

        <TextInput
          placeholder="000.000.000-00"
          placeholderTextColor="#8C8C8C"
          keyboardType="numeric"
          value={cpf}
          onChangeText={(text) => setCpf(formatCPF(text))}
          style={{
            height: 48,
            borderWidth: 1.3,
            borderColor: '#BDBDBD',
            borderRadius: 16,
            paddingHorizontal: 18,
            fontSize: 17,
            fontWeight: '600',
            color: '#111827',
            backgroundColor: '#FFFFFF',
            marginBottom: 12,
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <ShieldIcon width={24} height={24} />

          <Text
            size={15}
            weight="500"
            color="#7A7A7A"
            style={{
              flex: 1,
              marginLeft: 12,
              lineHeight: 19,
            }}
          >
            Seus dados estão protegidos e seguros.
          </Text>
        </View>

        <View
          style={{
            backgroundColor: '#DCEBFA',
            borderRadius: 18,
            paddingVertical: 12,
            paddingHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 22,
          }}
        >
          <SecurityLock width={28} height={28} />

          <Text
            size={15}
            weight="500"
            color="#0A66C2"
            style={{
              flex: 1,
              marginLeft: 16,
              lineHeight: 21,
            }}
          >
            Utilizamos seu CPF pra garantir mais segurança e personalizar sua experiência.
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleTutorLogin}
          style={{
            height: 58,
            backgroundColor: '#0A66C2',
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 18,
          }}
        >
          <TutorIcon width={28} height={28} />

          <Text size={19} weight="600" color="#FFFFFF" style={{ marginLeft: 14 }}>
            Entrar como Tutor
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <View style={{ flex: 1, height: 1.2, backgroundColor: '#8D8D8D' }} />

          <Text size={15} weight="600" color="#7B7B7B" style={{ marginHorizontal: 16 }}>
            Ou
          </Text>

          <View style={{ flex: 1, height: 1.2, backgroundColor: '#8D8D8D' }} />
        </View>

        <SocialButton
          icon={<GoogleIcon width={26} height={26} />}
          title="Continue com Google"
          onPress={handleTutorLogin}
        />

        <View style={{ height: 12 }} />

        <SocialButton
          icon={<AppleIcon width={26} height={26} />}
          title="Continue com Apple"
          onPress={handleTutorLogin}
        />

        <TouchableOpacity
          onPress={() => router.push('/tutor-create')}
          style={{
            alignItems: 'center',
            marginTop: 22,
            paddingBottom: 4,
          }}
        >
          <Text size={15} weight="600" color="#111827">
            Ainda não tem conta?{' '}
            <Text size={15} weight="600" color="#0A66C2">
              inscrever-se
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function SocialButton({
  icon,
  title,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={{
        height: 54,
        borderWidth: 1.4,
        borderColor: '#C9C9C9',
        borderRadius: 18,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {icon}

      <Text size={17} weight="700" color="#111827" style={{ marginLeft: 14 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}