import {
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text } from '@/src/components/atoms/Text';
import { useAppTheme } from '@/src/hooks/useAppTheme';

export default function ClinicNewAppointment() {
  const { theme } = useAppTheme();
  const [paciente, setPaciente] = useState('Thor');
  const [tipo, setTipo] = useState('Consulta');
  const [data, setData] = useState('20/05/2025');
  const [hora, setHora] = useState('08:00');
  const [veterinario, setVeterinario] = useState('João Victor');
  const [queixa, setQueixa] = useState('Apetite reduzido');
  const [observacoes, setObservacoes] = useState('Sem alterações relevantes.');
  const [exame, setExame] = useState('Temperatura: 38,2°C');

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 28,
        paddingTop: 58,
        paddingBottom: 34,
      }}
    >
      <Text size={26} weight="700" color={theme.text}>
        Novo Atendimento
      </Text>

      <Field label="Paciente">
        <Input value={paciente} onChangeText={setPaciente} />
      </Field>

      <Field label="Tipo de atendimento">
        <Input value={tipo} onChangeText={setTipo} />
      </Field>

      <Field label="Data e hora">
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Input value={data} onChangeText={setData} small />
          <Input value={hora} onChangeText={setHora} small />
        </View>
      </Field>

      <Field label="Veterinário">
        <Input value={veterinario} onChangeText={setVeterinario} />
      </Field>

      <Field label="Queixa principal">
        <Input value={queixa} onChangeText={setQueixa} />
      </Field>

      <Field label="Observações">
        <TextInput
          value={observacoes}
          onChangeText={setObservacoes}
          multiline
          textAlignVertical="top"
          style={{
            minHeight: 120,
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingTop: 16,
            fontSize: 15,
            color: theme.text,
            backgroundColor: theme.surface,
          }}
        />
      </Field>

      <Field label="Exame físico">
        <Input value={exame} onChangeText={setExame} />
      </Field>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => router.push('/clinic-prescription')}
        style={{
          height: 56,
          borderRadius: 12,
          backgroundColor: '#6D28D9',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 24,
        }}
      >
        <Text size={18} weight="700" color="#FFFFFF">
          Salvar atendimento
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const { theme } = useAppTheme();
  return (
    <View style={{ marginTop: 22 }}>
      <Text
        size={15}
        weight="700"
        color={theme.textSecondary}
        style={{ marginBottom: 8 }}
      >
        {label}
      </Text>

      {children}
    </View>
  );
}

function Input({
  value,
  onChangeText,
  small,
}: {
  value: string;
  onChangeText: (text: string) => void;
  small?: boolean;
}) {
  const { theme } = useAppTheme();
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      style={{
        flex: small ? 1 : undefined,
        height: 52,
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 15,
        color: theme.text,
        backgroundColor: theme.surface,
      }}
    />
  );
}