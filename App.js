/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StarWars from './StarWars';
import People from './People';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="StarWars">
      <Stack.Screen name="StarWars" component={StarWars} />
      <Stack.Screen name="People">
        {(props) => <People {...props} something="data" />}
      </Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
