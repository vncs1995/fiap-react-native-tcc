import React, {useRef, useState} from 'react';
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

const SignUp = ({navigation}) => {
  const formRef = useRef(null);
  const [error, setError] = useState();

  async function handleSubmit(data, {reset}) {
    console.log(data);

    try {
      const userLogged = await auth().createUserWithEmailAndPassword(
        data.email,
        data.password,
      );
      const userCreated = await firestore().collection('users').add(data);
      navigation.reset({
        index: 0,
        routes: [{name: 'Home', params: {user: userLogged.user}}],
      });
      console.log('responses> ', userLogged, 'userCreated> \n', userCreated);
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
          <Input label="Nome" name="name" />
          <Input
            label="E-mail"
            name="email"
            textContentType="emailAddress"
            autoCompleteType="email"
            autoCapitalize="none"
          />
          <Input label="Celular" name="phone" />
          <Input label="CEP" name="cep" />
          <Input label="Logradouro" name="streetName" />
          <Input label="Número" name="number" />
          <Input label="Complemento" name="complement" />
          <Input label="Bairro" name="district" />
          <Input label="Estado" name="state" />
          <Input label="Senha" name="password" password />
          <Button
            text="Registrar"
            onPress={() => formRef.current.submitForm()}
          />
          <StyledText>{error}</StyledText>
        </Form>
      </StyledView>
    </StyledScrollView>
  );
};

export default SignUp;
