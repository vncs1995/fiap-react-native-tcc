import React, {useRef, useState} from 'react';
import {Text} from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {
  StyledText,
  StyledScrollView,
  StyledView,
} from '../../components/styles';
import auth from '@react-native-firebase/auth';
import {Form} from '@unform/mobile';
import firestore from '@react-native-firebase/firestore';
import RNPickerSelect from 'react-native-picker-select';

const AddNewGame = ({navigation}) => {
  const formRef = useRef(null);
  const [error, setError] = useState();
  const [gameCondition, setGameCondition] = useState();

  async function handleSubmit(data, {reset}) {
    try {
      const payload = {
        ...data,
        email: auth().currentUser.email,
        gameCondition,
      };

      const addedGame = await firestore().collection('games').add(payload);
      navigation.reset({
        index: 0,
        routes: [
          {name: 'Home', params: {user: {email: auth().currentUser.email}}},
        ],
      });
    } catch (err) {
      console.log('err: ', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('That email address is already in use!');
      }

      if (err.code === 'auth/invalid-email') {
        setError('That email address is invalid!');
      }
    }

    // reset();
  }

  return (
    <StyledScrollView
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StyledView>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input label="Nome do jogo" name="name" />
          <Input label="Numero de jogadores" name="numberOfPlayers" />
          <Text>Condição do jogo</Text>
          <RNPickerSelect
            placeholder="Condição do jogo"
            onValueChange={value => setGameCondition(value)}
            items={[
              {label: 'Novo', value: 'New'},
              {label: 'Usado', value: 'Used'},
              {label: 'Usado com rasuras', value: 'Rasured'},
            ]}
          />
          <Button
            text="Registrar"
            onPress={() => formRef.current.submitForm()}
          />
          <StyledText color="red">{error}</StyledText>
        </Form>
      </StyledView>
    </StyledScrollView>
  );
};

export default AddNewGame;
