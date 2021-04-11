import React from 'react';
import {SafeAreaView} from 'react-native';
import styled from 'styled-components/native';
export const StyledTextInputLabel = styled.Text`
  align-self: flex-start;
  margin-bottom: 5px;
`;

export const StyledTextInput = styled.TextInput`
  align-self: flex-start;
  border-radius: 5px;
  border: 1px solid;
  padding: 10px;
  min-width: 50%;
  max-width: 100%;
`;

const Input = ({label, onChangeText, password}) => (
  <SafeAreaView>
    <StyledTextInputLabel>{label}</StyledTextInputLabel>
    <StyledTextInput onChangeText={onChangeText} secureTextEntry={!!password} />
  </SafeAreaView>
);

export default Input;
