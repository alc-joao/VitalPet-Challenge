import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text } from '@/src/components/atoms/Text';

import IconCam from '@/assets/icons/icon-cam.svg';
import IconArrowDown from '@/assets/icons/icon-arrow-down.svg';

const especies = ['Cachorro', 'Gato', 'Ave', 'Coelho', 'Outro'];

const racasPorEspecie: Record<string, string[]> = {
  Cachorro: [
    'Golden Retriever',
    'Labrador',
    'Shih Tzu',
    'Poodle',
    'Bulldog',
    'Pinscher',
    'Vira-lata',
  ],
  Gato: [
    'Siamês',
    'Persa',
    'Maine Coon',
    'Angorá',
    'Sphynx',
    'Vira-lata',
  ],
  Ave: ['Calopsita', 'Periquito', 'Canário', 'Papagaio'],
  Coelho: ['Mini Lop', 'Lionhead', 'Angorá', 'Holland Lop'],
  Outro: ['Outro'],
};

export default function PetForm() {
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');
  const [raca, setRaca] = useState('');
  const [nascimento, setNascimento] = useState('');

  const [modalEspecie, setModalEspecie] = useState(false);
  const [modalRaca, setModalRaca] = useState(false);

  const continuar = () => {
    if (!nome || !especie || !raca || !nascimento) return;

    router.push('/pet-health');
  };

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
        <Text size={40} color="#111827">
          ‹
        </Text>
      </TouchableOpacity>

      <Text
        size={28}
        weight="700"
        color="#111827"
        style={{ marginTop: 12 }}
      >
        Vamos Cadastrar{'\n'}seu pet
      </Text>

      <Text
        size={15}
        color="#444"
        style={{ marginTop: 8, marginBottom: 26 }}
      >
        Adicione as informações do seu pet{'\n'}
        para uma experiência personalizada
      </Text>

      <View
        style={{
          width: 122,
          height: 122,
          borderRadius: 61,
          borderWidth: 2,
          borderColor: '#0A66C2',
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 28,
        }}
      >
        <IconCam width={42} height={42} />

        <Text
          size={11}
          weight="700"
          color="#0A66C2"
          style={{ marginTop: 8 }}
        >
          Adicionar Foto
        </Text>
      </View>

      <Input
        label="Nome do pet"
        placeholder="Nome do seu Pet"
        value={nome}
        onChangeText={setNome}
      />

      <Select
        label="Espécie"
        placeholder="Cachorro"
        value={especie}
        onPress={() => setModalEspecie(true)}
      />

      <Select
        label="Raça"
        placeholder="Ex: Golden Retriever"
        value={raca}
        onPress={() => {
          if (!especie) return;
          setModalRaca(true);
        }}
      />

      <Input
        label="Data de Nascimento"
        placeholder="00/00/0000"
        value={nascimento}
        onChangeText={setNascimento}
        keyboardType="numeric"
      />

      <TouchableOpacity
        onPress={continuar}
        style={{
          height: 58,
          backgroundColor: '#0A66C2',
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 76,
        }}
      >
        <Text size={17} weight="700" color="#FFFFFF">
          Continuar
        </Text>
      </TouchableOpacity>

      <Modal visible={modalEspecie} transparent animationType="fade">
        <View style={modalOverlay}>
          <View style={modalBox}>
            {especies.map(item => (
              <TouchableOpacity
                key={item}
                style={modalItem}
                onPress={() => {
                  setEspecie(item);
                  setRaca('');
                  setModalEspecie(false);
                }}
              >
                <Text size={16} weight="600" color="#111827">
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <Modal visible={modalRaca} transparent animationType="fade">
        <View style={modalOverlay}>
          <View style={modalBox}>
            {(racasPorEspecie[especie] || []).map(item => (
              <TouchableOpacity
                key={item}
                style={modalItem}
                onPress={() => {
                  setRaca(item);
                  setModalRaca(false);
                }}
              >
                <Text size={16} weight="600" color="#111827">
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

type InputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'numeric';
};

function Input({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
}: InputProps) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text
        size={14}
        weight="700"
        color="#111827"
        style={{ marginBottom: 8 }}
      >
        {label}
      </Text>

      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#7D7D7D"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={{
          height: 56,
          borderWidth: 1,
          borderColor: '#C9C9C9',
          borderRadius: 16,
          paddingHorizontal: 18,
          fontSize: 22,
          fontWeight: '700',
          color: '#111827',
        }}
      />
    </View>
  );
}

type SelectProps = {
  label: string;
  placeholder: string;
  value: string;
  onPress: () => void;
};

function Select({
  label,
  placeholder,
  value,
  onPress,
}: SelectProps) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text
        size={14}
        weight="700"
        color="#111827"
        style={{ marginBottom: 8 }}
      >
        {label}
      </Text>

      <TouchableOpacity
        onPress={onPress}
        style={{
          height: 56,
          borderWidth: 1,
          borderColor: '#C9C9C9',
          borderRadius: 16,
          paddingHorizontal: 18,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text
          size={22}
          weight="600"
          color={value ? '#111827' : '#7D7D7D'}
        >
          {value || placeholder}
        </Text>

        <IconArrowDown width={22} height={22} />
      </TouchableOpacity>
    </View>
  );
}

const modalOverlay = {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.35)',
  justifyContent: 'center' as const,
  paddingHorizontal: 24,
};

const modalBox = {
  backgroundColor: '#FFFFFF',
  borderRadius: 18,
  paddingVertical: 8,
};

const modalItem = {
  paddingVertical: 16,
  paddingHorizontal: 20,
};