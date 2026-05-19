import {
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

import IconBack from '@/assets/icons/icon-back.svg';
import IconMedicine from '@/assets/icons/icon-medicine.svg';
import IconTrash from '@/assets/icons/icon-trash.svg';

const medicines = [
  {
    name: 'Omeprazol 10mg',
    description: '1 comprimido • 1x ao dia • 5 dias',
  },
  {
    name: 'Meloxicam 0,2%',
    description: '0,2 ml • 1x ao dia • 3 dias',
  },
];

export default function ClinicPrescription() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#FFFFFF' }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 28,
        paddingTop: 58,
        paddingBottom: 34,
      }}
    >
      <TouchableOpacity
        onPress={() => router.push('/clinic-new-appointment')}
        style={{
          width: 36,
          height: 36,
          justifyContent: 'center',
          marginBottom: 12,
        }}
      >
        <IconBack width={24} height={24} />
      </TouchableOpacity>

      <Text size={28} weight="700" color="#111827">
        Prescrição
      </Text>

      <Field label="Paciente">
        <TextInput value="Thor" editable={false} style={inputStyle} />
      </Field>

      <Text
        size={15}
        weight="700"
        color="#6B7280"
        style={{ marginTop: 30, marginBottom: 12 }}
      >
        Medicamentos
      </Text>

      <View
        style={{
          borderWidth: 1,
          borderColor: '#E5E7EB',
          borderRadius: 14,
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
        }}
      >
        {medicines.map((item, index) => (
          <MedicineCard
            key={item.name}
            item={item}
            last={index === medicines.length - 1}
          />
        ))}
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        style={{
          height: 52,
          borderRadius: 12,
          backgroundColor: '#F4F0FF',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 18,
        }}
      >
        <Text size={16} weight="700" color="#6D28D9">
          Adicionar medicamento
        </Text>
      </TouchableOpacity>

      <Field label="Observações">
        <TextInput
          value="Administrar após a refeição."
          editable={false}
          multiline
          textAlignVertical="top"
          style={[
            inputStyle,
            {
              minHeight: 112,
              paddingTop: 16,
            },
          ]}
        />
      </Field>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => router.push('/clinic-patient-history')}
        style={{
          height: 58,
          borderRadius: 12,
          backgroundColor: '#6D28D9',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 70,
        }}
      >
        <Text size={18} weight="700" color="#FFFFFF">
          Salvar prescrição
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
  return (
    <View style={{ marginTop: 26 }}>
      <Text
        size={15}
        weight="700"
        color="#6B7280"
        style={{ marginBottom: 8 }}
      >
        {label}
      </Text>

      {children}
    </View>
  );
}

function MedicineCard({
  item,
  last,
}: {
  item: {
    name: string;
    description: string;
  };
  last?: boolean;
}) {
  return (
    <View
      style={{
        minHeight: 82,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: '#E5E7EB',
      }}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          backgroundColor: '#F1E8FF',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 14,
        }}
      >
        <IconMedicine width={24} height={24} />
      </View>

      <View style={{ flex: 1 }}>
        <Text size={15} weight="700" color="#111827">
          {item.name}
        </Text>

        <Text
          size={13}
          weight="600"
          color="#6B7280"
          style={{ marginTop: 4 }}
        >
          {item.description}
        </Text>
      </View>

      <IconTrash width={22} height={22} />
    </View>
  );
}

const inputStyle = {
  height: 54,
  borderWidth: 1,
  borderColor: '#E5E7EB',
  borderRadius: 12,
  paddingHorizontal: 16,
  fontSize: 15,
  fontWeight: '600' as const,
  color: '#111827',
  backgroundColor: '#FFFFFF',
};