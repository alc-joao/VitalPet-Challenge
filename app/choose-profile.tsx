import { View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

export default function ChooseProfile() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#FFFFFF' }}
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingTop: 70,
        paddingBottom: 34,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ alignItems: 'center', marginBottom: 34 }}>
        <Image
          source={require('@/assets/logos/logo-blue.svg')}
          style={{
            width: 170,
            height: 90,
          }}
          resizeMode="contain"
        />
      </View>

      <Text
        size={34}
        weight="700"
        color="#111827"
        align="center"
      >
        Como você deseja{'\n'}usar o VitalPet?
      </Text>

      <Text
        size={16}
        color="#6B7280"
        align="center"
        style={{ marginTop: 10, marginBottom: 34 }}
      >
        Escolha seu perfil para continuar
      </Text>

      <ProfileCard
        image={require('@/assets/icons/profile-tutor.svg')}
        title="Tutor / Uso pessoal"
        description="Monitore saúde, rotina e bem-estar do seu pet"
        buttonText="Continuar como Tutor"
        onPress={() => router.push('/tutor-login')}
      />

      <View style={{ height: 22 }} />

      <ProfileCard
        image={require('@/assets/icons/profile-clinic.svg')}
        title="Clínica / Veterinário"
        description="Gerencie pacientes, alertas e acompanhamentos"
        buttonText="Continuar como clínica"
        onPress={() => router.push('/clinic-login')}
      />

      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          marginTop: 28,
          alignItems: 'center',
        }}
      >
        <Text size={15} color="#0A66C2" weight="600">
          ↩ Posso mudar depois
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

type ProfileCardProps = {
  image: any;
  title: string;
  description: string;
  buttonText: string;
  onPress: () => void;
};

function ProfileCard({
  image,
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
        borderRadius: 28,
        padding: 20,
        backgroundColor: '#FFFFFF',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          marginBottom: 24,
        }}
      >
        <View
          style={{
            width: 74,
            height: 74,
            borderRadius: 18,
            backgroundColor: '#EAF2FF',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 18,
          }}
        >
          <Image
            source={image}
            style={{
              width: 38,
              height: 38,
            }}
            resizeMode="contain"
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text size={26} weight="700" color="#111827">
            {title}
          </Text>

          <Text
            size={16}
            color="#374151"
            style={{ marginTop: 8, lineHeight: 24 }}
          >
            {description}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={{
          height: 62,
          backgroundColor: '#0A66C2',
          borderRadius: 31,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 24,
        }}
      >
        <Text
          size={20}
          weight="700"
          color="#FFFFFF"
        >
          {buttonText}
        </Text>

        <Text
          size={34}
          color="#FFFFFF"
          style={{ marginLeft: 12 }}
        >
          ›
        </Text>
      </TouchableOpacity>
    </View>
  );
}