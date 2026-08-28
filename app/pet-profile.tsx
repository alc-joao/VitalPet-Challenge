import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {
  router,
  useLocalSearchParams,
} from 'expo-router';

import {
  useEffect,
  useState,
} from 'react';

import { Text } from '@/src/components/atoms/Text';

import {
  usePet,
  useUpdatePet,
} from '@/src/hooks/usePets';

import IconArrowDown from '@/assets/icons/icon-arrow-down.svg';

const especies = [
  'Cachorro',
  'Gato',
  'Ave',
  'Coelho',
  'Outro',
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

export default function PetProfile() {
  const params = useLocalSearchParams<{
    petId?: string;
  }>();

  const petId = Number(params.petId);

  const {
    data: pet,
    isLoading,
    isError,
    refetch,
  } = usePet(petId);

  const updatePetMutation = useUpdatePet();

  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');
  const [raca, setRaca] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [peso, setPeso] = useState('');

  const [sexo, setSexo] = useState<
    'MACHO' | 'FEMEA' | ''
  >('');

  const [observacoes, setObservacoes] =
    useState('');

  const [modalEspecie, setModalEspecie] =
    useState(false);

  const [modalSexo, setModalSexo] =
    useState(false);

  /*
   * Quando os dados chegarem da API,
   * preenchemos automaticamente o formulário.
   */
  useEffect(() => {
    if (!pet) {
      return;
    }

    setNome(pet.nome);
    setEspecie(pet.especie);
    setRaca(pet.raca);

    setNascimento(
      formatarDataParaTela(pet.dataNascimento)
    );

    setPeso(
      String(pet.peso).replace('.', ',')
    );

    setSexo(pet.sexo);

    setObservacoes(
      pet.observacoes ?? ''
    );
  }, [pet]);

  function formatarNascimento(value: string) {
    const numeros = value
      .replace(/\D/g, '')
      .slice(0, 8);

    if (numeros.length <= 2) {
      return numeros;
    }

    if (numeros.length <= 4) {
      return `${numeros.slice(
        0,
        2
      )}/${numeros.slice(2)}`;
    }

    return `${numeros.slice(
      0,
      2
    )}/${numeros.slice(
      2,
      4
    )}/${numeros.slice(4)}`;
  }

  async function salvar() {
    if (
      !pet ||
      !nome.trim() ||
      !especie ||
      !raca.trim() ||
      !nascimento ||
      !sexo ||
      !peso
    ) {
      Alert.alert(
        'Campos incompletos',
        'Preencha todas as informações obrigatórias.'
      );

      return;
    }

    if (nascimento.length !== 10) {
      Alert.alert(
        'Data inválida',
        'Informe a data no formato DD/MM/AAAA.'
      );

      return;
    }

    const [dia, mes, ano] =
      nascimento.split('/');

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

    const dataNascimento =
      `${ano}-${mes}-${dia}`;

    const pesoNumero = Number(
      peso.replace(',', '.')
    );

    if (
      Number.isNaN(pesoNumero) ||
      pesoNumero <= 0
    ) {
      Alert.alert(
        'Peso inválido',
        'Informe um peso válido.'
      );

      return;
    }

    try {
      await updatePetMutation.mutateAsync({
        id: pet.id,

        pet: {
          nome: nome.trim(),
          especie,
          raca: raca.trim(),
          dataNascimento,
          sexo,
          peso: pesoNumero,
          observacoes:
            observacoes.trim(),
          tutorId: pet.tutorId,
        },
      });

      Alert.alert(
        'Pet atualizado',
        'As informações foram atualizadas com sucesso.',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      console.error(
        'Erro ao atualizar pet:',
        error
      );

      Alert.alert(
        'Erro ao atualizar',
        'Não foi possível salvar as alterações. Tente novamente.'
      );
    }
  }

  /*
   * LOADING
   */

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator
          size="large"
          color="#0A66C2"
        />

        <Text
          size={16}
          color="#6B7280"
          style={{
            marginTop: 16,
          }}
        >
          Carregando pet...
        </Text>
      </View>
    );
  }

  /*
   * ERRO
   */

  if (
    isError ||
    !pet ||
    !petId ||
    Number.isNaN(petId)
  ) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 30,
        }}
      >
        <Text
          size={22}
          weight="700"
          color="#111827"
          align="center"
        >
          Não foi possível carregar o pet
        </Text>

        <Text
          size={15}
          color="#6B7280"
          align="center"
          style={{
            marginTop: 10,
          }}
        >
          Verifique a conexão com a API e tente novamente.
        </Text>

        <TouchableOpacity
          onPress={() => refetch()}
          style={{
            backgroundColor: '#0A66C2',
            paddingHorizontal: 24,
            paddingVertical: 14,
            borderRadius: 14,
            marginTop: 24,
          }}
        >
          <Text
            size={16}
            weight="700"
            color="#FFFFFF"
          >
            Tentar novamente
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            marginTop: 20,
          }}
        >
          <Text
            size={16}
            weight="700"
            color="#0A66C2"
          >
            Voltar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const salvando =
    updatePetMutation.isPending;

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 40,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* VOLTAR */}

      <TouchableOpacity
        onPress={() => router.back()}
        disabled={salvando}
      >
        <Text
          size={40}
          color="#111827"
        >
          ‹
        </Text>
      </TouchableOpacity>

      {/* TÍTULO */}

      <Text
        size={28}
        weight="700"
        color="#111827"
        style={{
          marginTop: 12,
          marginBottom: 8,
        }}
      >
        Editar pet
      </Text>

      <Text
        size={15}
        color="#6B7280"
        style={{
          marginBottom: 30,
        }}
      >
        Atualize as informações de {pet.nome}
      </Text>

      {/* NOME */}

      <Input
        label="Nome"
        value={nome}
        onChangeText={setNome}
        placeholder="Nome do pet"
      />

      {/* ESPÉCIE */}

      <Select
        label="Espécie"
        value={especie}
        placeholder="Selecione"
        onPress={() =>
          setModalEspecie(true)
        }
      />

      {/* RAÇA */}

      <Input
        label="Raça"
        value={raca}
        onChangeText={setRaca}
        placeholder="Raça"
      />

      {/* NASCIMENTO */}

      <Input
        label="Data de nascimento"
        value={nascimento}
        onChangeText={(text) =>
          setNascimento(
            formatarNascimento(text)
          )
        }
        placeholder="00/00/0000"
        keyboardType="numeric"
        maxLength={10}
      />

      {/* SEXO */}

      <Select
        label="Sexo"
        value={
          sexo === 'MACHO'
            ? 'Macho'
            : sexo === 'FEMEA'
              ? 'Fêmea'
              : ''
        }
        placeholder="Selecione"
        onPress={() =>
          setModalSexo(true)
        }
      />

      {/* PESO */}

      <Input
        label="Peso (kg)"
        value={peso}
        onChangeText={(text) =>
          setPeso(
            text.replace(
              /[^0-9,.]/g,
              ''
            )
          )
        }
        placeholder="Ex: 12,5"
        keyboardType="numeric"
      />

      {/* OBSERVAÇÕES */}

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
          Observações
        </Text>

        <TextInput
          value={observacoes}
          onChangeText={setObservacoes}
          placeholder="Observações sobre o pet"
          placeholderTextColor="#7D7D7D"
          multiline
          textAlignVertical="top"
          style={{
            minHeight: 120,
            borderWidth: 1,
            borderColor: '#C9C9C9',
            borderRadius: 16,
            paddingHorizontal: 18,
            paddingVertical: 16,
            fontSize: 17,
            color: '#111827',
          }}
        />
      </View>

      {/* SALVAR */}

      <TouchableOpacity
        onPress={salvar}
        disabled={salvando}
        activeOpacity={0.85}
        style={{
          height: 60,
          backgroundColor: salvando
            ? '#78A9DC'
            : '#0A66C2',
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
        }}
      >
        {salvando ? (
          <ActivityIndicator
            color="#FFFFFF"
          />
        ) : (
          <Text
            size={18}
            weight="700"
            color="#FFFFFF"
          >
            Salvar alterações
          </Text>
        )}
      </TouchableOpacity>

      {/* MODAL ESPÉCIE */}

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

      {/* MODAL SEXO */}

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
    </ScrollView>
  );
}

function formatarDataParaTela(
  data: string
) {
  const [ano, mes, dia] =
    data.split('-');

  return `${dia}/${mes}/${ano}`;
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
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#7D7D7D"
        keyboardType={keyboardType}
        maxLength={maxLength}
        style={{
          height: 56,
          borderWidth: 1,
          borderColor: '#C9C9C9',
          borderRadius: 16,
          paddingHorizontal: 18,
          fontSize: 18,
          fontWeight: '600',
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
          size={18}
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