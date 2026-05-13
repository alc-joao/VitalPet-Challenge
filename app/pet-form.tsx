import { View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Text } from '@/src/components/atoms/Text';

export default function PetForm() {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    const petSalvo = await AsyncStorage.getItem('petData');

    if (petSalvo) {
      const pet = JSON.parse(petSalvo);
      setNome(pet.nome);
      setIdade(pet.idade);
      setPeso(pet.peso);
    }
  }

  async function salvarDados() {
    const pet = { nome, idade, peso };

    await AsyncStorage.setItem('petData', JSON.stringify(pet));

    Alert.alert('Sucesso', 'Dados do pet salvos com sucesso!');
    router.push('/pet-profile');
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#FFFFFF' }}
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingTop: 70,
        paddingBottom: 40,
      }}
    >
      <Text size={30} weight="700" color="#111827" align="center">
        Cadastre seu Pet
      </Text>

      <Text
        size={16}
        color="#6B7280"
        align="center"
        style={{ marginTop: 10, marginBottom: 34 }}
      >
        Preencha as informações principais
      </Text>

      <View style={{ gap: 18 }}>
        <View>
          <Text size={15} weight="600" style={{ marginBottom: 8 }}>
            Nome do pet
          </Text>

          <TextInput
            placeholder="Ex: Thor"
            value={nome}
            onChangeText={setNome}
            style={{
              height: 56,
              borderWidth: 1,
              borderColor: '#D1D5DB',
              borderRadius: 16,
              paddingHorizontal: 16,
              fontSize: 16,
            }}
          />
        </View>

        <View>
          <Text size={15} weight="600" style={{ marginBottom: 8 }}>
            Idade
          </Text>

          <TextInput
            placeholder="Ex: 3"
            keyboardType="numeric"
            value={idade}
            onChangeText={setIdade}
            style={{
              height: 56,
              borderWidth: 1,
              borderColor: '#D1D5DB',
              borderRadius: 16,
              paddingHorizontal: 16,
              fontSize: 16,
            }}
          />
        </View>

        <View>
          <Text size={15} weight="600" style={{ marginBottom: 8 }}>
            Peso (kg)
          </Text>

          <TextInput
            placeholder="Ex: 12"
            keyboardType="numeric"
            value={peso}
            onChangeText={setPeso}
            style={{
              height: 56,
              borderWidth: 1,
              borderColor: '#D1D5DB',
              borderRadius: 16,
              paddingHorizontal: 16,
              fontSize: 16,
            }}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={salvarDados}
        style={{
          marginTop: 30,
          height: 58,
          backgroundColor: '#0A66C2',
          borderRadius: 18,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text size={18} weight="700" color="#FFFFFF">
          Salvar Pet
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          marginTop: 18,
          alignItems: 'center',
        }}
      >
        <Text size={15} color="#6B7280">
          ← Voltar
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}