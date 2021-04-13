import React from 'react';
import styled from 'styled-components';

const RoundButton = ({onPress, text, color}) => (
  <RoundButtonContainer color={color} onPress={onPress}>
    <RoundButtonText>{text}</RoundButtonText>
  </RoundButtonContainer>
);

export default RoundButton;

const RoundButtonContainer = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  padding: 8px;
  border-radius: 50px;
  background-color: ${props => props.color};
`;

const RoundButtonText = styled.Text`
  font-size: 35px;
  color: white;
  text-align: center;
`;
