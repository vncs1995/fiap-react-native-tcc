import {useField} from '@unform/core';
import React, {useCallback, useEffect, useRef} from 'react';
import {SafeAreaView} from 'react-native';
import styled from 'styled-components/native';
import {StyledText} from '../styles';

export const StyledTextInputLabel = styled.Text`
  align-self: flex-start;
  margin-bottom: 5px;
`;

export const StyledTextInput = styled.TextInput`
  flex: 1;
  align-self: flex-start;
  border-radius: 5px;
  padding-left: 5px;
  border: 1px solid;
  min-width: 50%;
  max-width: 100%;
  max-height: 35px;
  margin-bottom: 15px;
`;

const Input = ({name, label, password, onChangeText, ...rest}) => {
  const inputRef = useRef(null);
  const {fieldName, registerField, defaultValue, error} = useField(name);
  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = defaultValue;
    }
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue() {
        if (inputRef.current) {
          return inputRef.current.value;
        }
        return '';
      },
      setValue(ref, value) {
        if (inputRef.current) {
          inputRef.current.setNativeProps({text: value});
          inputRef.current.value = value;
        }
      },
      clearValue() {
        if (inputRef.current) {
          inputRef.current.setNativeProps({text: ''});
          inputRef.current.value = '';
        }
      },
    });
  }, [fieldName, registerField]);

  const handleChangeText = useCallback(
    text => {
      if (inputRef.current) {
        inputRef.current.value = text;
      }
      if (onChangeText) {
        onChangeText(text);
      }
    },
    [onChangeText],
  );

  return (
    <SafeAreaView>
      <StyledTextInputLabel>{label}</StyledTextInputLabel>
      <StyledTextInput
        secureTextEntry={!!password}
        ref={inputRef}
        onChangeText={handleChangeText}
        defaultValue={defaultValue}
        {...rest}
      />
      <StyledText>{error}</StyledText>
    </SafeAreaView>
  );
};

export default Input;
