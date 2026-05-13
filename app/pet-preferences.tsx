import { View, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text } from '@/src/components/atoms/Text';

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
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 34,
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Text size={28} color="#111827">‹</Text>
      </TouchableOpacity>

      <Text size={26} weight="700" color="#111827" style={{ marginTop: 12 }}>
        Preferências e{'\n'}lembretes
      </Text>

      <Text size={15} color="#6B7280" style={{ marginTop: 8, marginBottom: 24 }}>
        Escolha como deseja receber lembretes e alertas importantes.
      </Text>

      <Text size={17} weight="700" color="#111827" style={{ marginBottom: 12 }}>
        Receber lembretes por
      </Text>

      <Option label="Notificações" value={notificacao} onValueChange={setNotificacao} />
      <Option label="WhatsApp" value={whatsapp} onValueChange={setWhatsapp} />
      <Option label="E-mail" value={email} onValueChange={setEmail} />

      <Text size={17} weight="700" color="#111827" style={{ marginTop: 20, marginBottom: 12 }}>
        Lembretes para
      </Text>

      <Option label="Vacinas" value={vacinas} onValueChange={setVacinas} />
      <Option label="Consulta" value={consulta} onValueChange={setConsulta} />
      <Option label="Medicamentos" value={medicamentos} onValueChange={setMedicamentos} />
      <Option label="Vermífugos" value={vermifugos} onValueChange={setVermifugos} />

      <TouchableOpacity
        onPress={() => router.push('/pet-success')}
        style={{
          height: 56,
          backgroundColor: '#0A66C2',
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 26,
        }}
      >
        <Text size={17} weight="700" color="#FFFFFF">
          Salvar e continuar
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Option({ label, value, onValueChange }: any) {
  return (
    <View
      style={{
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text size={16} weight="600" color="#111827">
        {label}
      </Text>

      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}