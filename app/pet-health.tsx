import { View, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text } from '@/src/components/atoms/Text';

export default function PetHealth() {
  const [peso, setPeso] = useState('');
  const [porte, setPorte] = useState('');
  const [condicao, setCondicao] = useState('');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 34,
      }}
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
        Informações de{'\n'}saúde
      </Text>

      <Text
        size={15}
        color="#6B7280"
        style={{ marginTop: 8, marginBottom: 28 }}
      >
        Nos ajude a cuidar melhor do seu pet com informações importantes.
      </Text>

      <Input
        label="Peso"
        placeholder="Ex: 12kg"
        value={peso}
        onChangeText={setPeso}
      />

      <Input
        label="Porte"
        placeholder="Ex: Médio"
        value={porte}
        onChangeText={setPorte}
      />

      <Input
        label="Condição especial?"
        placeholder="Ex: Não"
        value={condicao}
        onChangeText={setCondicao}
      />

      <TouchableOpacity
        onPress={() => router.push('/pet-preferences')}
        style={{
          height: 56,
          backgroundColor: '#0A66C2',
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 'auto',
        }}
      >
        <Text size={17} weight="700" color="#FFFFFF">
          Salvar e continuar
        </Text>
      </TouchableOpacity>
    </View>
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
    <View style={{ marginBottom: 18 }}>
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