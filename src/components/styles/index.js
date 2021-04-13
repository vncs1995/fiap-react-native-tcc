import styled from 'styled-components/native';
import {Platform} from 'react-native';

export const StyledView = styled.View`
  flex: 1;
  background-color: white;
  justify-content: center;
  align-items: center;
  padding-bottom: 200px;
`;

export const StyledScrollView = styled.ScrollView`
  flex: 1;
  background-color: white;
  padding-top: ${Platform.select({ios: 100, android: 30})}px;
`;

export const StyledText = styled.Text`
  color: palevioletred;
`;
