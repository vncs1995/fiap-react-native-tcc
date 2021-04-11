import React, {useState} from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {StyledText, StyledView} from '../../components/styles';
import LottieView from 'lottie-react-native';
import auth from '@react-native-firebase/auth';

const Login = () => {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const submit = async () => {
    try {
      const response = await auth().signInWithEmailAndPassword(login, password);
      console.log('response: ', response);
    } catch (err) {
      console.log('err> ', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('That email address is already in use!');
      }

      if (err.code === 'auth/invalid-email') {
        setError('That email address is invalid!');
      }
    }
  };

  return (
    <StyledView>
      <Input label="Login" onChangeText={setLogin} />
      <Input label="Senha" onChangeText={setPassword} password />
      <Button text="Entrar" onPress={submit} />
      <StyledText>{error}</StyledText>
    </StyledView>
  );
};

export default Login;
