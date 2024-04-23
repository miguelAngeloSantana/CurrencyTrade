import React from 'react'

import { CurrencyChooseNavigator } from './src/redux/currencyChooseNavigator';
import { store } from './src/redux/store';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{headerShown: false}} 
          initialRouteName={'TelaPrincipal'}
        >
          <Stack.Screen 
            name="TelaPrincipal" 
            component={CurrencyChooseNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}