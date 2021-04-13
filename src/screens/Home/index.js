import React, {useCallback, useEffect, useState} from 'react';
import {StyledText} from '../../components/styles';
import ButtonText from '../../components/ButtonText';
import Button from '../../components/Button';
import auth from '@react-native-firebase/auth';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import CardGame from '../../components/CardGame';
import RoundButton from '../../components/RoundButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation, route}) => {
  const [games, setGames] = useState([]);
  const user = route.params.user;

  const fetchGames = useCallback(async () => {
    const games = await firestore()
      .collection('games')
      .orderBy('numberOfPlayers', 'desc')
      .limit(20)
      .get();
    const gamesArray = [];
    games.forEach(game => {
      gamesArray.push(game.data());
    });
    setGames(gamesArray);
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('@userEmail', user.email);
    fetchGames();
  }, [fetchGames, user.email]);

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
    <View style={styles.container}>
      <StyledText>Welcome {user.email}</StyledText>
      <View style={styles.logoutContainer}>
        <ButtonText text="Sobre" onPress={() => navigation.navigate('About')} />
        <ButtonText text="Sair" onPress={logout} />
      </View>
      <FlatList
        data={games}
        extraData={games}
        renderItem={CardGame}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => <StyledText>Lista de jogos</StyledText>}
        ListEmptyComponent={() => <Text>Não existem jogos</Text>}
      />
      <View style={styles.roundButtonContainer}>
        <Button
          onPress={() => navigation.navigate('SignUp', {changeData: true})}
        />
        <RoundButton
          color="green"
          text="+"
          onPress={() => navigation.navigate('AddNewGame')}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  logoutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roundButtonContainer: {
    position: 'absolute',
    bottom: 50,
    right: 30,
  },
});
