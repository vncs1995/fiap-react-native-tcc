import React, {useState, useCallback, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import About from './About';
import AddNewGame from './AddNewGame';
import GameDetails from './GameDetails';

const Stack = createStackNavigator();

function Routes() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  const onAuthStateChanged = useCallback(
    _user => {
      setUser(_user);
      if (initializing) {
        setInitializing(false);
      }
    },
    [initializing],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

  if (initializing) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'Home' : 'Login'}>
        <Stack.Screen name="Home" component={Home} initialParams={{user}} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="AddNewGame" component={AddNewGame} />
        <Stack.Screen name="GameDetails" component={GameDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
