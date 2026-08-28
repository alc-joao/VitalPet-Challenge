import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';

import { router } from 'expo-router';
import { useState } from 'react';

import { Text } from '@/src/components/atoms/Text';

import IconCam from '@/assets/icons/icon-cam.svg';
import IconArrowDown from '@/assets/icons/icon-arrow-down.svg';

const especies = [
  'Cachorro',
  'Gato',
  'Ave',
  'Coelho',
  'Outro',
];

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

  Ave: [
    'Calopsita',
    'Periquito',
    'Canário',
    'Papagaio',
  ],

  Coelho: [
    'Mini Lop',
    'Lionhead',
    'Angorá',
    'Holland Lop',
  ],

  Outro: ['Outro'],
};

export default function PetForm() {
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');
  const [raca, setRaca] = useState('');
  const [nascimento, setNascimento] = useState('');

  const [modalEspecie, setModalEspecie] =
    useState(false);

  const [modalRaca, setModalRaca] =
    useState(false);

  function formatarNascimento(value: string) {
    const numeros = value
      .replace(/\D/g, '')
      .slice(0, 8);

    if (numeros.length <= 2) {
      return numeros;
    }

    if (numeros.length <= 4) {
      return `${numeros.slice(0, 2)}/${numeros.slice(
        2
      )}`;
    }

    return `${numeros.slice(0, 2)}/${numeros.slice(
      2,
      4
    )}/${numeros.slice(4)}`;
  }

  function continuar() {
    const nomeLimpo = nome.trim();

    if (
      !nomeLimpo ||
      !especie ||
      !raca ||
      nascimento.length !== 10
    ) {
      Alert.alert(
        'Campos incompletos',
        'Preencha todas as informações do pet antes de continuar.'
      );

      return;
    }

    const [dia, mes, ano] = nascimento.split('/');

    const diaNumero = Number(dia);
    const mesNumero = Number(mes);
    const anoNumero = Number(ano);

    if (
      diaNumero < 1 ||
      diaNumero > 31 ||
      mesNumero < 1 ||
      mesNumero > 12 ||
      anoNumero < 1900
    ) {
      Alert.alert(
        'Data inválida',
        'Informe uma data de nascimento válida.'
      );

      return;
    }

    /*
     * O backend trabalha com:
     *
     * YYYY-MM-DD
     *
     * Exemplo:
     * 10/05/2020 -> 2020-05-10
     */
    const dataNascimento =
      `${ano}-${mes}-${dia}`;

    router.push({
      pathname: '/pet-health',

      params: {
        nome: nomeLimpo,
        especie,
        raca,
        dataNascimento,
      },
    });
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 34,
      }}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Text
          size={40}
          color="#111827"
        >
          ‹
        </Text>
      </TouchableOpacity>

      <Text
        size={28}
        weight="700"
        color="#111827"
        style={{
          marginTop: 12,
        }}
      >
        Vamos Cadastrar{'\n'}seu pet
      </Text>

      <Text
        size={15}
        color="#444"
        style={{
          marginTop: 8,
          marginBottom: 26,
        }}
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
        <IconCam
          width={42}
          height={42}
        />

        <Text
          size={11}
          weight="700"
          color="#0A66C2"
          style={{
            marginTop: 8,
          }}
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
        onPress={() =>
          setModalEspecie(true)
        }
      />

      <Select
        label="Raça"
        placeholder="Ex: Golden Retriever"
        value={raca}
        onPress={() => {
          if (!especie) {
            Alert.alert(
              'Selecione a espécie',
              'Escolha a espécie do pet antes de selecionar a raça.'
            );

            return;
          }

          setModalRaca(true);
        }}
      />

      <Input
        label="Data de Nascimento"
        placeholder="00/00/0000"
        value={nascimento}
        onChangeText={(text) =>
          setNascimento(
            formatarNascimento(text)
          )
        }
        keyboardType="numeric"
        maxLength={10}
      />

      <TouchableOpacity
        onPress={continuar}
        activeOpacity={0.85}
        style={{
          height: 58,
          backgroundColor: '#0A66C2',
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 76,
        }}
      >
        <Text
          size={17}
          weight="700"
          color="#FFFFFF"
        >
          Continuar
        </Text>
      </TouchableOpacity>

      {/* ==========================
          MODAL ESPÉCIE
      ========================== */}

      <Modal
        visible={modalEspecie}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setModalEspecie(false)
        }
      >
        <TouchableOpacity
          activeOpacity={1}
          style={modalOverlay}
          onPress={() =>
            setModalEspecie(false)
          }
        >
          <View style={modalBox}>
            {especies.map((item) => (
              <TouchableOpacity
                key={item}
                style={modalItem}
                onPress={() => {
                  setEspecie(item);
                  setRaca('');
                  setModalEspecie(false);
                }}
              >
                <Text
                  size={16}
                  weight="600"
                  color="#111827"
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* ==========================
          MODAL RAÇA
      ========================== */}

      <Modal
        visible={modalRaca}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setModalRaca(false)
        }
      >
        <TouchableOpacity
          activeOpacity={1}
          style={modalOverlay}
          onPress={() =>
            setModalRaca(false)
          }
        >
          <View style={modalBox}>
            {(racasPorEspecie[especie] || []).map(
              (item) => (
                <TouchableOpacity
                  key={item}
                  style={modalItem}
                  onPress={() => {
                    setRaca(item);
                    setModalRaca(false);
                  }}
                >
                  <Text
                    size={16}
                    weight="600"
                    color="#111827"
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </View>
        </TouchableOpacity>
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
  maxLength?: number;
};

function Input({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  maxLength,
}: InputProps) {
  return (
    <View
      style={{
        marginBottom: 16,
      }}
    >
      <Text
        size={14}
        weight="700"
        color="#111827"
        style={{
          marginBottom: 8,
        }}
      >
        {label}
      </Text>

      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#7D7D7D"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
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
    <View
      style={{
        marginBottom: 16,
      }}
    >
      <Text
        size={14}
        weight="700"
        color="#111827"
        style={{
          marginBottom: 8,
        }}
      >
        {label}
      </Text>

      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
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
          color={
            value
              ? '#111827'
              : '#7D7D7D'
          }
        >
          {value || placeholder}
        </Text>

        <IconArrowDown
          width={22}
          height={22}
        />
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