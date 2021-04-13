import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Button from '../../components/Button';
import {StyledView} from '../../components/styles';

const About = ({navigation}) => (
  <StyledView style={styles.container}>
    <Text style={styles.devName}>Vinicius Viana dos Santos</Text>
    <Text style={styles.title}>BorrowGame</Text>
    <Text style={styles.history}>
      BorrowGame consiste em um app para conectar usuários que gostariam de
      trocar ou emprestar seus board games.
    </Text>
    <Text style={styles.footer}>
      <Text style={{fontWeight: 'bold'}}>Borrow </Text>
      <Text>faz menção à board, haha!</Text>
    </Text>
    <Button text="Voltar" onPress={() => navigation.pop()} />
  </StyledView>
);

export default About;

const styles = StyleSheet.create({
  devName: {fontWeight: 'bold', fontSize: 20},
  title: {fontWeight: 'bold', fontSize: 16, marginVertical: 15},
  history: {marginHorizontal: 20, textAlign: 'justify', marginBottom: 10},
  footer: {fontStyle: 'italic', marginBottom: 30},
});
