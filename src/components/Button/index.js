import React from 'react';
import styled from 'styled-components';

const Button = ({onPress, text}) => (
  <ButtonContainer onPress={onPress}>
    <ButtonText>{text}</ButtonText>
  </ButtonContainer>
);

export default Button;

const ButtonContainer = styled.TouchableOpacity`
  width: 100px;
  height: 40px;
  padding: 10px 12px;
  border-radius: 10px;
  border: solid;
  background-color: white;
  justify-content: center;
`;

const ButtonText = styled.Text`
  font-size: 15px;
  text-align: center;
`;
