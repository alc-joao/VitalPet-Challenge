import { View, TouchableOpacity, TextInput, Image } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text } from '@/src/components/atoms/Text';

export default function ClinicLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
        paddingTop: 70,
        paddingBottom: 30,
      }}
    >
      <View style={{ alignItems: 'center', marginBottom: 28 }}>
        <Image
          source={require('@/assets/logos/logo-blue.svg')}
          style={{
            width: 170,
            height: 90,
          }}
          resizeMode="contain"
        />
      </View>

      <Text size={30} weight="700" color="#111827" align="center">
        Gerencie sua{'\n'}clínica com o{'\n'}VitalPet
      </Text>

      <Text
        size={16}
        color="#6B7280"
        align="center"
        style={{ marginTop: 12, marginBottom: 34 }}
      >
        Acesse sua conta para monitorar pacientes, consultas e alertas.
      </Text>

      <View style={{ gap: 18 }}>
        <View>
          <Text
            size={15}
            weight="600"
            color="#111827"
            style={{ marginBottom: 8 }}
          >
            Email profissional
          </Text>

          <TextInput
            placeholder="Digite seu email"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={{
              height: 56,
              borderWidth: 1,
              borderColor: '#D1D5DB',
              borderRadius: 16,
              paddingHorizontal: 16,
              fontSize: 16,
            }}
          />
        </View>

        <View>
          <Text
            size={15}
            weight="600"
            color="#111827"
            style={{ marginBottom: 8 }}
          >
            Senha
          </Text>

          <TextInput
            placeholder="Digite sua senha"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
            style={{
              height: 56,
              borderWidth: 1,
              borderColor: '#D1D5DB',
              borderRadius: 16,
              paddingHorizontal: 16,
              fontSize: 16,
            }}
          />
        </View>
      </View>

      <TouchableOpacity
        style={{
          alignSelf: 'flex-end',
          marginTop: 12,
        }}
      >
        <Text size={14} color="#0A66C2">
          Esqueceu sua senha?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push('/clinic-home')}
        style={{
          marginTop: 28,
          height: 58,
          backgroundColor: '#0A66C2',
          borderRadius: 18,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text size={18} weight="700" color="#FFFFFF">
          Entrar como Clínica
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          marginTop: 14,
          height: 58,
          borderWidth: 1.5,
          borderColor: '#0A66C2',
          borderRadius: 18,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text size={17} weight="600" color="#0A66C2">
          Cadastrar nova clínica
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          marginTop: 'auto',
          alignItems: 'center',
        }}
      >
        <Text size={15} color="#6B7280">
          ← Voltar para seleção de perfil
        </Text>
      </TouchableOpacity>
    </View>
  );
}