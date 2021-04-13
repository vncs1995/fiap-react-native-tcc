import React from 'react';
import {StyledText, StyledView} from '../../components/styles';
import ButtonText from '../../components/ButtonText';
import auth from '@react-native-firebase/auth';

const Home = ({navigation, route}) => {
  const user = route.params.user;
  const logout = async () => {
    try {
      await auth().signOut();
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    } catch (err) {}
  };
  return (
    <StyledView>
      <ButtonText text="Sair" onPress={logout} />
      <StyledText>Welcome {user.email}</StyledText>
    </StyledView>
  );
};

export default Home;
