import { View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';
import LogoBlue from '@/assets/logos/logo-blue.svg';
import TutorIcon from '@/assets/icons/profile-tutor.svg';
import ClinicIcon from '@/assets/icons/profile-clinic.svg';
import ChangeLaterIcon from '@/assets/icons/change-later.svg';

export default function ChooseProfile() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FCFCFC',
        paddingTop: 62,
        paddingHorizontal: 22,
        paddingBottom: 34,
      }}
    >
      <View style={{ alignItems: 'center', marginBottom: 34 }}>
        <LogoBlue width={165} height={110} />

        <Text size={31} weight="700" color="#111827" align="center">
          Como você deseja{'\n'}usar o VitalPet?
        </Text>

        <Text
          size={17}
          color="#111827"
          align="center"
          style={{ marginTop: 14, opacity: 0.85 }}
        >
          Escolha seu perfil para continuar
        </Text>
      </View>

      <ProfileCard
        icon={<TutorIcon width={40} height={40} />}
        title="Tutor / Uso pessoal"
        description={'Monitore saúde, rotina e\nbem-estar do seu pet'}
        buttonText="Continuar como Tutor"
        onPress={() => router.push('/tutor-login')}
      />

      <View style={{ height: 22 }} />

      <ProfileCard
        icon={<ClinicIcon width={40} height={40} />}
        title="Clínica / Veterinário"
        description={'Gerencie pacientes, alertas\ne acompanhamentos'}
        buttonText="Continuar como clínica"
        onPress={() => router.push('/clinic-login')}
      />

      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          marginTop: 'auto',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 18,
        }}
      >
        <ChangeLaterIcon width={24} height={24} />

        <Text
          size={16}
          weight="600"
          color="#0A66C2"
          style={{ marginLeft: 10 }}
        >
          Posso mudar depois
        </Text>
      </TouchableOpacity>
    </View>
  );
}

type ProfileCardProps = {
  icon: React.ReactNode;
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
        borderColor: '#3B82F6',
        borderRadius: 24,
        padding: 20,
        backgroundColor: '#FFFFFF',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          marginBottom: 22,
        }}
      >
        <View
          style={{
            width: 70,
            height: 70,
            borderRadius: 18,
            backgroundColor: '#EEF4FF',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 18,
          }}
        >
          {icon}
        </View>

        <View style={{ flex: 1 }}>
          <Text size={23} weight="700" color="#111827">
            {title}
          </Text>

          <Text
            size={15}
            color="#111827"
            style={{ marginTop: 8, lineHeight: 24, opacity: 0.9 }}
          >
            {description}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={{
          height: 60,
          backgroundColor: '#0A66C2',
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text size={17} weight="600" color="#FFFFFF">
          {buttonText}
        </Text>

        <Text size={30} color="#FFFFFF" style={{ marginLeft: 16 }}>
          
        </Text>
      </TouchableOpacity>
    </View>
  );
}