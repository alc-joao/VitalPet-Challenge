import { View, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

export default function TutorHome() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#F8FAFC' }}
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingTop: 70,
        paddingBottom: 40,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ marginBottom: 28 }}>
        <Text size={14} color="#6B7280">
          Bem-vindo,
        </Text>

        <Text size={30} weight="700" color="#111827">
          Tutor VitalPet
        </Text>
      </View>

      <View
        style={{
          backgroundColor: '#0A66C2',
          borderRadius: 28,
          padding: 24,
          marginBottom: 26,
        }}
      >
        <Text size={16} color="#D9E8FF">
          Saúde geral do pet
        </Text>

        <Text
          size={46}
          weight="700"
          color="#FFFFFF"
          style={{ marginTop: 8 }}
        >
          85%
        </Text>

        <Text
          size={15}
          color="#D9E8FF"
          style={{ marginTop: 4 }}
        >
          Tudo certo por enquanto 🐾
        </Text>
      </View>

      <Text
        size={22}
        weight="700"
        color="#111827"
        style={{ marginBottom: 18 }}
      >
        Acesso rápido
      </Text>

      <View style={{ gap: 18 }}>
        <HomeCard
          icon="🐾"
          title="Cadastrar Pet"
          description="Adicione ou edite informações"
          onPress={() => router.push('/pet-form')}
        />

        <HomeCard
          icon="📋"
          title="Perfil do Pet"
          description="Veja dados salvos"
          onPress={() => router.push('/pet-profile')}
        />

        <HomeCard
          icon="💉"
          title="Vacinação"
          description="Controle vacinas e lembretes"
        />

        <HomeCard
          icon="🍽️"
          title="Rotina"
          description="Alimentação e hábitos"
        />
      </View>

      <TouchableOpacity
        onPress={() => router.replace('/choose-profile')}
        style={{
          marginTop: 30,
          alignItems: 'center',
        }}
      >
        <Text size={15} color="#6B7280">
          ← Trocar perfil
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

type HomeCardProps = {
  icon: string;
  title: string;
  description: string;
  onPress?: () => void;
};

function HomeCard({
  icon,
  title,
  description,
  onPress,
}: HomeCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <View
          style={{
            width: 58,
            height: 58,
            borderRadius: 18,
            backgroundColor: '#EAF2FF',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text size={26}>{icon}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text size={20} weight="700" color="#111827">
            {title}
          </Text>

          <Text
            size={15}
            color="#6B7280"
            style={{ marginTop: 4 }}
          >
            {description}
          </Text>
        </View>

        <Text size={28} color="#0A66C2">
          ›
        </Text>
      </View>
    </TouchableOpacity>
  );
}