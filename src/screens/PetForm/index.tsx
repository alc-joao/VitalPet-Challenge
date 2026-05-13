// src/screens/pet-form/index.tsx

import React, { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as S from './styles';

const speciesOptions = ['Cachorro', 'Gato', 'Ave', 'Coelho', 'Outro'];

const breedsBySpecies: Record<string, string[]> = {
  Cachorro: [
    'Golden Retriever',
    'Labrador',
    'Shih Tzu',
    'Poodle',
    'Bulldog',
    'Pinscher',
    'Vira-lata',
  ],
  Gato: ['Siamês', 'Persa', 'Maine Coon', 'Angorá', 'Sphynx', 'Vira-lata'],
  Ave: ['Calopsita', 'Periquito', 'Canário', 'Papagaio'],
  Coelho: ['Mini Lop', 'Lionhead', 'Angorá', 'Holland Lop'],
  Outro: ['Outro'],
};

export const PetForm = () => {
  const navigation = useNavigation();

  const [petName, setPetName] = useState('');
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const [speciesModal, setSpeciesModal] = useState(false);
  const [breedModal, setBreedModal] = useState(false);

  const handleContinue = () => {
    if (!petName || !species || !breed || !birthDate) {
      Alert.alert(
        'Campos incompletos',
        'Preencha todas as informações do pet para continuar.',
      );
      return;
    }

    navigation.navigate('Home' as never);
  };

  const handleSpeciesSelect = (selectedSpecies: string) => {
    setSpecies(selectedSpecies);
    setBreed('');
    setSpeciesModal(false);
  };

  const handleBreedSelect = (selectedBreed: string) => {
    setBreed(selectedBreed);
    setBreedModal(false);
  };

  return (
    <S.Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <S.BackButton onPress={() => navigation.goBack()}>
          <S.BackIcon>{'‹'}</S.BackIcon>
        </S.BackButton>

        <S.Title>Vamos Cadastrar{'\n'}seu pet</S.Title>

        <S.Subtitle>
          Adicione as informações do seu pet{'\n'}
          para uma experiência personalizada
        </S.Subtitle>

        <S.PhotoButton>
          <S.CameraIcon>📷+</S.CameraIcon>
          <S.PhotoText>Adicionar Foto</S.PhotoText>
        </S.PhotoButton>

        <S.Label>Nome do pet</S.Label>
        <S.Input
          placeholder="Rex"
          value={petName}
          onChangeText={setPetName}
          placeholderTextColor="#8E8E93"
        />

        <S.Label>Espécie</S.Label>
        <S.SelectButton onPress={() => setSpeciesModal(true)}>
          <S.SelectText selected={!!species}>
            {species || 'Selecione'}
          </S.SelectText>
          <S.Arrow>⌄</S.Arrow>
        </S.SelectButton>

        <S.Label>Raça</S.Label>
        <S.SelectButton
          onPress={() => {
            if (!species) {
              Alert.alert('Escolha uma espécie primeiro');
              return;
            }
            setBreedModal(true);
          }}
        >
          <S.SelectText selected={!!breed}>
            {breed || 'Selecione'}
          </S.SelectText>
          <S.Arrow>⌄</S.Arrow>
        </S.SelectButton>

        <S.Label>Data de Nascimento</S.Label>
        <S.Input
          placeholder="24/05/2021"
          value={birthDate}
          onChangeText={setBirthDate}
          keyboardType="numeric"
          maxLength={10}
          placeholderTextColor="#8E8E93"
        />

        <S.ContinueButton onPress={handleContinue}>
          <S.ContinueText>Continuar</S.ContinueText>
        </S.ContinueButton>
      </ScrollView>

      <Modal visible={speciesModal} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setSpeciesModal(false)}>
          <S.ModalOverlay>
            <S.ModalContent>
              {speciesOptions.map(item => (
                <TouchableOpacity
                  key={item}
                  onPress={() => handleSpeciesSelect(item)}
                >
                  <S.ModalItem>{item}</S.ModalItem>
                </TouchableOpacity>
              ))}
            </S.ModalContent>
          </S.ModalOverlay>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal visible={breedModal} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setBreedModal(false)}>
          <S.ModalOverlay>
            <S.ModalContent>
              {(breedsBySpecies[species] || []).map(item => (
                <TouchableOpacity
                  key={item}
                  onPress={() => handleBreedSelect(item)}
                >
                  <S.ModalItem>{item}</S.ModalItem>
                </TouchableOpacity>
              ))}
            </S.ModalContent>
          </S.ModalOverlay>
        </TouchableWithoutFeedback>
      </Modal>
    </S.Container>
  );
};