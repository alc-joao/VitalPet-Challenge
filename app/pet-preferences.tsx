import { View, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text } from '@/src/components/atoms/Text';

import IconBell from '@/assets/icons/icon-bell.svg';
import IconWhatsapp from '@/assets/icons/icon-whatsapp.svg';
import IconEmail from '@/assets/icons/icon-email.svg';
import IconVaccine from '@/assets/icons/icon-vaccine.svg';
import IconConsult from '@/assets/icons/icon-consult.svg';
import IconMedicine from '@/assets/icons/icon-medicine.svg';
import IconWorm from '@/assets/icons/icon-worm.svg';

export default function PetPreferences() {
  const [notificacao, setNotificacao] = useState(true);
  const [whatsapp, setWhatsapp] = useState(true);
  const [email, setEmail] = useState(true);
  const [vacinas, setVacinas] = useState(true);
  const [consulta, setConsulta] = useState(true);
  const [medicamentos, setMedicamentos] = useState(true);
  const [vermifugos, setVermifugos] = useState(false);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#FFFFFF' }}
      contentContainerStyle={{
        paddingHorizontal: 36,
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
        size={30}
        weight="700"
        color="#111827"
        style={{ marginTop: 34 }}
      >
        Preferências e{'\n'}lembretes
      </Text>

      <Text
        size={18}
        color="#444"
        style={{ marginTop: 10, marginBottom: 38 }}
      >
        Escolha como deseja receber{'\n'}
        lembretes e alertas importantes
      </Text>

      <Text
        size={22}
        weight="700"
        color="#111827"
        style={{ marginBottom: 24 }}
      >
        Receber lembretes por
      </Text>

      <Option
        icon={<IconBell width={26} height={26} />}
        label="Notificações"
        description="Recomendado"
        value={notificacao}
        onValueChange={setNotificacao}
      />

      <Option
        icon={<IconWhatsapp width={26} height={26} />}
        label="WhatsApp"
        value={whatsapp}
        onValueChange={setWhatsapp}
      />

      <Option
        icon={<IconEmail width={26} height={26} />}
        label="E-mail"
        value={email}
        onValueChange={setEmail}
      />

      <Text
        size={22}
        weight="700"
        color="#111827"
        style={{ marginTop: 20, marginBottom: 24 }}
      >
        Lembretes  para
      </Text>

      <Option
        icon={<IconVaccine width={26} height={26} />}
        label="Vacinas"
        value={vacinas}
        onValueChange={setVacinas}
      />

      <Option
        icon={<IconConsult width={26} height={26} />}
        label="Consulta"
        value={consulta}
        onValueChange={setConsulta}
      />

      <Option
        icon={<IconMedicine width={26} height={26} />}
        label="Medicamentos"
        value={medicamentos}
        onValueChange={setMedicamentos}
      />

      <Option
        icon={<IconWorm width={26} height={26} />}
        label="Vermífugos"
        value={vermifugos}
        onValueChange={setVermifugos}
      />

      <TouchableOpacity
        onPress={() => router.push('/pet-success')}
        style={{
          height: 64,
          backgroundColor: '#0A66C2',
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 32,
        }}
      >
        <Text size={22} weight="700" color="#FFFFFF">
          Salvar e continuar
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

type OptionProps = {
  icon: React.ReactNode;
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

function Option({
  icon,
  label,
  description,
  value,
  onValueChange,
}: OptionProps) {
  return (
    <View
      style={{
        minHeight: 64,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
      }}
    >
      <View
        style={{
          width: 44,
          alignItems: 'center',
          marginRight: 24,
        }}
      >
        {icon}
      </View>

      <View style={{ flex: 1 }}>
        <Text size={20} weight="700" color="#111827">
          {label}
        </Text>

        {description && (
          <Text size={16} color="#6B7280" style={{ marginTop: 4 }}>
            {description}
          </Text>
        )}
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#8E8E93', true: '#0A66C2' }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#8E8E93"
      />
    </View>
  );
}