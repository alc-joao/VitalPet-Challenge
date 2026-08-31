import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { router } from 'expo-router';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Text } from '@/src/components/atoms/Text';
import { loginWithEmail } from '@/src/services/authService';
import { getTutorByEmail } from '@/src/services/tutorService';

import LogoBlue from '@/assets/logos/logo-blue.svg';
import TutorIcon from '@/assets/icons/profile-tutor-white.svg';
import SecurityLock from '@/assets/icons/security-lock.svg';
import ShieldIcon from '@/assets/icons/shield.svg';

export default function TutorLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleTutorLogin() {
    const emailLimpo = email.trim().toLowerCase();

    if (!emailLimpo.includes('@')) {
      Alert.alert(
        'Email inválido',
        'Digite um email válido.'
      );
      return;
    }

    if (senha.length < 6) {
      Alert.alert(
        'Senha inválida',
        'Digite sua senha.'
      );
      return;
    }

    try {
      setLoading(true);

      await loginWithEmail(
        emailLimpo,
        senha
      );

      const tutor = await getTutorByEmail(
        emailLimpo
      );

      if (!tutor) {
        Alert.alert(
          'Tutor não encontrado',
          'Sua autenticação foi realizada, mas não encontramos seu cadastro de tutor na API.'
        );
        return;
      }

      await AsyncStorage.setItem(
        '@vitalpet:tutor',
        JSON.stringify(tutor)
      );

      if (tutor.cpf) {
        await AsyncStorage.setItem(
          '@vitalpet:lastCpf',
          tutor.cpf.replace(/\D/g, '')
        );
      }

      router.replace('/tutor-home');
    } catch (error: any) {
      console.error(
        'Erro ao fazer login:',
        error
      );

      const code = error?.code;

      if (
        code === 'auth/invalid-credential' ||
        code === 'auth/wrong-password' ||
        code === 'auth/user-not-found'
      ) {
        Alert.alert(
          'Login inválido',
          'Email ou senha incorretos.'
        );
        return;
      }

      if (code === 'auth/invalid-email') {
        Alert.alert(
          'Email inválido',
          'Digite um email válido.'
        );
        return;
      }

      if (code === 'auth/too-many-requests') {
        Alert.alert(
          'Muitas tentativas',
          'Aguarde alguns minutos e tente novamente.'
        );
        return;
      }

      Alert.alert(
        'Erro ao entrar',
        'Não foi possível entrar. Verifique sua conexão e tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: '#FCFCFC',
      }}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }
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
        <View
          style={{
            alignItems: 'center',
            marginBottom: 14,
          }}
        >
          <LogoBlue
            width={130}
            height={72}
          />
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
          Cuide melhor{'\n'}
          do seu pet com{'\n'}
          VitalPet
        </Text>

        <Text
          size={16}
          color="#111827"
          style={{
            lineHeight: 19,
            marginBottom: 18,
          }}
        >
          Acompanhe a saúde, vacinas,{'\n'}
          consultas e alertas em um só lugar.
        </Text>

        <Text
          size={15}
          weight="600"
          color="#111827"
          style={{
            marginBottom: 8,
          }}
        >
          Email
        </Text>

        <TextInput
          placeholder="seuemail@email.com"
          placeholderTextColor="#8C8C8C"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          editable={!loading}
          onChangeText={setEmail}
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

        <Text
          size={15}
          weight="600"
          color="#111827"
          style={{
            marginBottom: 8,
          }}
        >
          Senha
        </Text>

        <TextInput
          placeholder="••••••••"
          placeholderTextColor="#8C8C8C"
          secureTextEntry
          value={senha}
          editable={!loading}
          onChangeText={setSenha}
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
          <ShieldIcon
            width={24}
            height={24}
          />

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
          <SecurityLock
            width={28}
            height={28}
          />

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
            Login seguro com Firebase Authentication.
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          disabled={loading}
          onPress={handleTutorLogin}
          style={{
            height: 58,
            borderRadius: 16,
            backgroundColor:
              loading
                ? '#7AAFE3'
                : '#0A66C2',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <TutorIcon
                width={22}
                height={22}
              />

              <Text
                size={18}
                weight="700"
                color="#FFFFFF"
                style={{
                  marginLeft: 10,
                }}
              >
                Entrar como tutor
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            router.push('/tutor-create')
          }
          disabled={loading}
          style={{
            alignItems: 'center',
            marginTop: 24,
          }}
        >
          <Text
            size={16}
            weight="700"
            color="#111827"
          >
            Ainda não tem conta?{' '}
            <Text
              size={16}
              weight="700"
              color="#0A66C2"
            >
              Cadastre-se
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
