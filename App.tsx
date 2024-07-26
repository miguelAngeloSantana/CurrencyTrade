import { Provider } from 'react-redux';;

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';


import { CurrencyChooseNavigator } from './src/redux/currencyChooseNavigator';
import { store } from './src/redux/store';
import DetailsScreen, { screenOptions as DetailsScreenOptions } from './src/cryptoCurrency/screen/DetailsScreen';

export type AppStackParams = {
  HomeScreen: undefined
  DetailsScreen: { name: string, id: number, price: number, percentChange: number }
}


const Stack = createStackNavigator<AppStackParams>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{headerShown: false}} 
          initialRouteName={'HomeScreen'}
        >
          <Stack.Screen 
            name="HomeScreen" 
            component={CurrencyChooseNavigator}
          />

          <Stack.Screen 
            name="DetailsScreen" 
            component={DetailsScreen}
            options={DetailsScreenOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};