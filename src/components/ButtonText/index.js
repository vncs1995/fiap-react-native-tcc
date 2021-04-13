import React from 'react';
import styled from 'styled-components';

const ButtonText = ({onPress, text}) => (
  <ButtonTextContainer onPress={onPress}>
    <Text>{text}</Text>
  </ButtonTextContainer>
);

export default ButtonText;

const ButtonTextContainer = styled.TouchableOpacity`
  margin: 15px 0;
`;

const Text = styled.Text`
  font-size: 15px;
  text-align: center;
`;
