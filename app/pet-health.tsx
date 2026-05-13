import { View, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text } from '@/src/components/atoms/Text';

export default function PetHealth() {
  const [peso, setPeso] = useState('Macho');
  const [porte, setPorte] = useState('Grande');
  const [condicao, setCondicao] = useState('Não');

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
        <Text size={28} color="#111827">‹</Text>
      </TouchableOpacity>

      <Text size={26} weight="700" color="#111827" style={{ marginTop: 12 }}>
        Informações de{'\n'}saúde
      </Text>

      <Text size={15} color="#6B7280" style={{ marginTop: 8, marginBottom: 34 }}>
        Esses lembretes nos ajudam a cuidar melhor do seu pet.
      </Text>

      <Input label="Peso (kg)" value={peso} onChangeText={setPeso} />
      <Input label="Porte" value={porte} onChangeText={setPorte} />
      <Input label="Possui alguma condição especial?" value={condicao} onChangeText={setCondicao} />

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

function Input(props: any) {
  return (
    <View style={{ marginBottom: 18 }}>
      <Text size={14} weight="600" color="#111827" style={{ marginBottom: 6 }}>
        {props.label}
      </Text>

      <TextInput
        {...props}
        style={{
          height: 54,
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