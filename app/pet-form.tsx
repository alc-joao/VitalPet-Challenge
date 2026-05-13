import { View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text } from '@/src/components/atoms/Text';

export default function PetForm() {
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');
  const [raca, setRaca] = useState('');
  const [nascimento, setNascimento] = useState('');

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

      <Text
        size={28}
        weight="700"
        color="#111827"
        style={{ marginTop: 12 }}
      >
        Vamos cadastrar{'\n'}seu pet
      </Text>

      <Text
        size={15}
        color="#6B7280"
        style={{ marginTop: 8, marginBottom: 26 }}
      >
        Adicione as principais informações para personalizar sua experiência.
      </Text>

      <View
        style={{
          width: 96,
          height: 96,
          borderRadius: 48,
          borderWidth: 2,
          borderColor: '#0A66C2',
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 28,
        }}
      >
        <Text size={28}>📷</Text>
        <Text size={11} color="#0A66C2">
          Adicionar Foto
        </Text>
      </View>

      <Input
        label="Nome do pet"
        placeholder="Ex: Thor"
        value={nome}
        onChangeText={setNome}
      />

      <Input
        label="Espécie"
        placeholder="Ex: Cachorro"
        value={especie}
        onChangeText={setEspecie}
      />

      <Input
        label="Raça"
        placeholder="Ex: Golden Retriever"
        value={raca}
        onChangeText={setRaca}
      />

      <Input
        label="Data de nascimento"
        placeholder="DD/MM/AAAA"
        value={nascimento}
        onChangeText={setNascimento}
      />

      <TouchableOpacity
        onPress={() => router.push('/pet-health')}
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
          Continuar
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
};

function Input({
  label,
  placeholder,
  value,
  onChangeText,
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