import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Text } from '@/src/components/atoms/Text';
import { useDeleteTutor } from '@/src/hooks/useTutors';

export default function TutorDelete() {
  const params = useLocalSearchParams();
  const tutorId = Number(params.tutorId);

  const deleteTutorMutation = useDeleteTutor();

  async function excluirConta() {
    if (!tutorId) {
      Alert.alert(
        'Erro',
        'Não foi possível identificar o tutor.'
      );
      return;
    }

    try {
      await deleteTutorMutation.mutateAsync(tutorId);

      await AsyncStorage.multiRemove([
        '@vitalpet:tutor',
        '@vitalpet:lastCpf',
      ]);

      Alert.alert(
        'Conta excluída',
        'Sua conta foi excluída com sucesso.',
        [
          {
            text: 'OK',
            onPress: () =>
              router.replace('/tutor-login'),
          },
        ]
      );
    } catch (error) {
      console.error(
        'Erro ao excluir tutor:',
        error
      );

      Alert.alert(
        'Erro',
        'Não foi possível excluir sua conta.'
      );
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
      }}
    >
      <View
        style={{
          width: '100%',
          maxWidth: 480,
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: 78,
            height: 78,
            borderRadius: 39,
            backgroundColor: '#FFF1F1',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            size={34}
            weight="700"
            color="#EF4444"
          >
            !
          </Text>
        </View>

        <Text
          size={28}
          weight="700"
          color="#111827"
          align="center"
          style={{
            marginTop: 24,
          }}
        >
          Excluir conta?
        </Text>

        <Text
          size={16}
          color="#7D7D7D"
          align="center"
          style={{
            marginTop: 12,
            lineHeight: 23,
          }}
        >
          Esta ação irá remover sua conta de tutor do VitalPet.
        </Text>

        <Text
          size={14}
          weight="700"
          color="#EF4444"
          align="center"
          style={{
            marginTop: 8,
          }}
        >
          Essa ação não poderá ser desfeita.
        </Text>

        <TouchableOpacity
          onPress={excluirConta}
          disabled={deleteTutorMutation.isPending}
          activeOpacity={0.85}
          style={{
            width: '100%',
            height: 58,
            borderRadius: 16,
            backgroundColor:
              deleteTutorMutation.isPending
                ? '#FCA5A5'
                : '#EF4444',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 32,
          }}
        >
          {deleteTutorMutation.isPending ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text
              size={17}
              weight="700"
              color="#FFFFFF"
            >
              Sim, excluir minha conta
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.back()}
          disabled={deleteTutorMutation.isPending}
          activeOpacity={0.85}
          style={{
            width: '100%',
            height: 58,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: '#D1D5DB',
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 12,
          }}
        >
          <Text
            size={17}
            weight="700"
            color="#111827"
          >
            Cancelar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
