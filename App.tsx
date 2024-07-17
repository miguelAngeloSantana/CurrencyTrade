import { Provider } from 'react-redux';;

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';


import { CurrencyChooseNavigator } from './src/redux/currencyChooseNavigator';
import CryptoCoinLists from './src/cryptoCurrency/screen/CryptoCoinLists';
import { store } from './src/redux/store';

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

          <Stack.Screen 
            name="TelaExibirmoedas" 
            component={CryptoCoinLists}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};