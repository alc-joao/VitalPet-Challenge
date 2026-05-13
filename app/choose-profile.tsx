import { View, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

export default function ChooseProfile() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
        paddingTop: 70,
        paddingBottom: 40,
      }}
    >
      <View style={{ alignItems: 'center', marginBottom: 34 }}>
        <Image
          source={require('@/assets/logos/logo-blue.svg')}
          style={{ width: 170, height: 90 }}
          resizeMode="contain"
        />
      </View>

      <Text size={34} weight="700" color="#111827" align="center">
        Como você deseja{'\n'}usar o VitalPet?
      </Text>

      <Text
        size={17}
        color="#6B7280"
        align="center"
        style={{ marginTop: 12, marginBottom: 34 }}
      >
        Escolha seu perfil para continuar
      </Text>

      <View style={{ gap: 22 }}>
        <ProfileCard
          icon={require('@/assets/icons/profile-tutor.svg')}
          title="Tutor / Uso pessoal"
          description="Monitore saúde, rotina e bem-estar do seu pet"
          buttonText="Continuar como Tutor"
          onPress={() => router.push('/tutor-home')}
        />

        <ProfileCard
          icon={require('@/assets/icons/profile-clinic.svg')}
          title="Clínica / Veterinário"
          description="Gerencie pacientes, alertas e acompanhamentos"
          buttonText="Continuar como clínica"
          onPress={() => router.push('/clinic-login')}
        />
      </View>

      <TouchableOpacity style={{ marginTop: 'auto', alignItems: 'center' }}>
        <Text size={16} color="#0A66C2">
          ↩ Posso mudar depois
        </Text>
      </TouchableOpacity>
    </View>
  );
}

type ProfileCardProps = {
  icon: any;
  title: string;
  description: string;
  buttonText: string;
  onPress: () => void;
};

function ProfileCard({
  icon,
  title,
  description,
  buttonText,
  onPress,
}: ProfileCardProps) {
  return (
    <View
      style={{
        borderWidth: 1.5,
        borderColor: '#0A66C2',
        borderRadius: 24,
        padding: 18,
        backgroundColor: '#FFFFFF',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          gap: 16,
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <View
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            backgroundColor: '#EAF2FF',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={icon}
            style={{ width: 44, height: 44 }}
            resizeMode="contain"
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text size={23} weight="700" color="#111827">
            {title}
          </Text>

          <Text
            size={16}
            color="#111827"
            style={{ marginTop: 6, lineHeight: 22 }}
          >
            {description}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={{
          width: '100%',
          height: 56,
          backgroundColor: '#0A66C2',
          borderRadius: 18,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
        <Text size={17} weight="700" color="#FFFFFF">
          {buttonText}
        </Text>

        <Text
          size={30}
          weight="700"
          color="#FFFFFF"
          style={{ position: 'absolute', right: 22 }}
        >
          ›
        </Text>
      </TouchableOpacity>
    </View>
  );
}