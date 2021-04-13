import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components';

const CardGame = ({item, index}) => (
  <CardContainer key={index}>
    <CardTitle>{item.name}</CardTitle>
    <Text>{item.gameCondition}</Text>
    <Text>{`${item.numberOfPlayers} players`}</Text>
  </CardContainer>
);

const CardTitle = styled.Text`
  font-weight: bold;
  text-transform: uppercase;
`;

const CardContainer = styled.View`
  height: 80px;
  padding: 15px;
  margin: 15px 0;
  border-radius: 30px;
  border: solid;
  background-color: white;
  justify-content: center;
  box-shadow: 1px 1px 1px black;
`;

export default CardGame;
