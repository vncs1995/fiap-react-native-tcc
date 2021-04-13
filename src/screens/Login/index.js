import React, {useRef, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Form} from '@unform/mobile';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {StyledText, StyledView} from '../../components/styles';
import auth from '@react-native-firebase/auth';
import ButtonText from '../../components/ButtonText';

const Login = ({navigation}) => {
  const formRef = useRef(null);
  const [error, setError] = useState();

  const submit = async data => {
    try {
      const response = await auth().signInWithEmailAndPassword(
        data.email,
        data.password,
      );
      const userData = await firestore()
        .collection('users')
        .where('email', '==', data.email)
        .get();

      console.log('response: ', userData.docs);
      navigation.reset({
        index: 0,
        routes: [{name: 'Home', params: {user: response.user}}],
      });
    } catch (err) {
      console.log('err> ', err);
      if (err.code === 'auth/wrong-password') {
        setError('Senha incorreta!');
      }

      if (err.code === 'auth/invalid-email') {
        setError('Email inválido!');
      }
    }
  };

  return (
    <StyledView>
      <Form ref={formRef} onSubmit={submit}>
        <Input
          label="Login"
          name="email"
          textContentType="emailAddress"
          autoCompleteType="email"
          autoCapitalize="none"
        />
        <Input label="Senha" name="password" password />
        <Button text="Entrar" onPress={() => formRef.current.submitForm()} />
        <ButtonText
          text="Cadastre-se"
          onPress={() => navigation.navigate('SignUp')}
        />
        <StyledText>{error}</StyledText>
      </Form>
    </StyledView>
  );
};

export default Login;
