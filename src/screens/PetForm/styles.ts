// src/screens/pet-form/styles.ts

import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
  padding: 20px 24px;
`;

export const BackButton = styled.TouchableOpacity`
  width: 40px;
  margin-top: 10px;
  margin-bottom: 30px;
`;

export const BackIcon = styled.Text`
  font-size: 42px;
  color: #000;
`;

export const Title = styled.Text`
  font-size: 42px;
  font-weight: bold;
  color: #000;
  line-height: 48px;
`;

export const Subtitle = styled.Text`
  font-size: 18px;
  color: #444;
  margin-top: 12px;
  line-height: 26px;
  margin-bottom: 35px;
`;

export const PhotoButton = styled.TouchableOpacity`
  width: 150px;
  height: 150px;
  border-width: 2px;
  border-color: #0066db;
  border-radius: 75px;
  align-self: center;
  justify-content: center;
  align-items: center;
  margin-bottom: 35px;
`;

export const CameraIcon = styled.Text`
  font-size: 38px;
  color: #0066db;
`;

export const PhotoText = styled.Text`
  font-size: 16px;
  color: #0066db;
  font-weight: 600;
  margin-top: 6px;
`;

export const Label = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: 10px;
  margin-top: 8px;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 62px;
  border-width: 1px;
  border-color: #d9d9d9;
  border-radius: 16px;
  padding: 0 18px;
  font-size: 28px;
  color: #000;
  margin-bottom: 18px;
`;

export const SelectButton = styled.TouchableOpacity`
  width: 100%;
  height: 62px;
  border-width: 1px;
  border-color: #d9d9d9;
  border-radius: 16px;
  padding: 0 18px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`;

export const SelectText = styled.Text<{ selected: boolean }>`
  font-size: 28px;
  color: ${({ selected }) => (selected ? '#000' : '#8E8E93')};
`;

export const Arrow = styled.Text`
  font-size: 28px;
  color: #777;
`;

export const ContinueButton = styled.TouchableOpacity`
  width: 100%;
  height: 65px;
  background-color: #0066db;
  border-radius: 18px;
  justify-content: center;
  align-items: center;
  margin-top: 45px;
  margin-bottom: 30px;
`;

export const ContinueText = styled.Text`
  font-size: 28px;
  color: #fff;
  font-weight: bold;
`;

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.35);
  justify-content: center;
  padding: 24px;
`;

export const ModalContent = styled.View`
  background-color: #fff;
  border-radius: 20px;
  padding: 10px 0;
`;

export const ModalItem = styled.Text`
  font-size: 24px;
  padding: 18px 22px;
  color: #000;
`;
