import {
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';

import {
  router,
  useLocalSearchParams,
} from 'expo-router';

import { useState } from 'react';

import { Text } from '@/src/components/atoms/Text';

import IconArrowDown from '@/assets/icons/icon-arrow-down.svg';

const portes = [
  'Pequeno',
  'Médio',
  'Grande',
];

const condicoes = [
  'Não',
  'Sim',
];

const sexos = [
  {
    label: 'Macho',
    value: 'MACHO',
  },
  {
    label: 'Fêmea',
    value: 'FEMEA',
  },
];

export default function PetHealth() {
  const params = useLocalSearchParams<{
    nome?: string;
    especie?: string;
    raca?: string;
    dataNascimento?: string;
  }>();

  const [peso, setPeso] = useState('');
  const [porte, setPorte] = useState('');
  const [condicao, setCondicao] = useState('');

  const [sexo, setSexo] = useState<
    'MACHO' | 'FEMEA' | ''
  >('');

  const [modalPorte, setModalPorte] =
    useState(false);

  const [modalCondicao, setModalCondicao] =
    useState(false);

  const [modalSexo, setModalSexo] =
    useState(false);

  function continuar() {
    if (
      !peso ||
      !porte ||
      !condicao ||
      !sexo
    ) {
      Alert.alert(
        'Campos incompletos',
        'Preencha todas as informações antes de continuar.'
      );

      return;
    }

    const pesoNormalizado = peso.replace(
      ',',
      '.'
    );

    const pesoNumero =
      Number(pesoNormalizado);

    if (
      Number.isNaN(pesoNumero) ||
      pesoNumero <= 0
    ) {
      Alert.alert(
        'Peso inválido',
        'Informe um peso válido para o pet.'
      );

      return;
    }

    if (
      !params.nome ||
      !params.especie ||
      !params.raca ||
      !params.dataNascimento
    ) {
      Alert.alert(
        'Dados incompletos',
        'Não foi possível recuperar as informações do pet. Volte e preencha o cadastro novamente.'
      );

      return;
    }

    router.push({
      pathname: '/pet-preferences',

      params: {
        nome: params.nome,
        especie: params.especie,
        raca: params.raca,
        dataNascimento:
          params.dataNascimento,

        peso: String(pesoNumero),
        sexo,
        porte,
        condicao,
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
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        onPress={() => router.back()}
      >
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
        Informações de{'\n'}saúde
      </Text>

      <Text
        size={15}
        color="#444"
        style={{
          marginTop: 8,
          marginBottom: 36,
        }}
      >
        Esses lembretes nos ajudam a cuidar
        {'\n'}
        melhor do seu pet
      </Text>

      <Input
        label="Peso (kg)"
        placeholder="Ex: 12"
        value={peso}
        onChangeText={(text) => {
          const valor = text.replace(
            /[^0-9,.]/g,
            ''
          );

          setPeso(valor);
        }}
        keyboardType="numeric"
      />

      <Select
        label="Sexo"
        placeholder="Selecione"
        value={
          sexo === 'MACHO'
            ? 'Macho'
            : sexo === 'FEMEA'
            ? 'Fêmea'
            : ''
        }
        onPress={() =>
          setModalSexo(true)
        }
      />

      <Select
        label="Porte"
        placeholder="Grande"
        value={porte}
        onPress={() =>
          setModalPorte(true)
        }
      />

      <Select
        label="Possui alguma condição especial?"
        placeholder="Não"
        value={condicao}
        onPress={() =>
          setModalCondicao(true)
        }
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
          marginTop: 'auto',
        }}
      >
        <Text
          size={17}
          weight="700"
          color="#FFFFFF"
        >
          Salvar e continuar
        </Text>
      </TouchableOpacity>

      {/* ==========================
          MODAL SEXO
      ========================== */}

      <Modal
        visible={modalSexo}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setModalSexo(false)
        }
      >
        <TouchableOpacity
          activeOpacity={1}
          style={modalOverlay}
          onPress={() =>
            setModalSexo(false)
          }
        >
          <View style={modalBox}>
            {sexos.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={modalItem}
                onPress={() => {
                  setSexo(
                    item.value as
                      | 'MACHO'
                      | 'FEMEA'
                  );

                  setModalSexo(false);
                }}
              >
                <Text
                  size={16}
                  weight="600"
                  color="#111827"
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* ==========================
          MODAL PORTE
      ========================== */}

      <Modal
        visible={modalPorte}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setModalPorte(false)
        }
      >
        <TouchableOpacity
          activeOpacity={1}
          style={modalOverlay}
          onPress={() =>
            setModalPorte(false)
          }
        >
          <View style={modalBox}>
            {portes.map((item) => (
              <TouchableOpacity
                key={item}
                style={modalItem}
                onPress={() => {
                  setPorte(item);
                  setModalPorte(false);
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
          MODAL CONDIÇÃO
      ========================== */}

      <Modal
        visible={modalCondicao}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setModalCondicao(false)
        }
      >
        <TouchableOpacity
          activeOpacity={1}
          style={modalOverlay}
          onPress={() =>
            setModalCondicao(false)
          }
        >
          <View style={modalBox}>
            {condicoes.map((item) => (
              <TouchableOpacity
                key={item}
                style={modalItem}
                onPress={() => {
                  setCondicao(item);
                  setModalCondicao(false);
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
    </ScrollView>
  );
}

type InputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (
    text: string
  ) => void;
  keyboardType?:
    | 'default'
    | 'numeric';
};

function Input({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
}: InputProps) {
  return (
    <View
      style={{
        marginBottom: 18,
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
        marginBottom: 18,
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
          weight="700"
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
  backgroundColor:
    'rgba(0,0,0,0.35)',
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