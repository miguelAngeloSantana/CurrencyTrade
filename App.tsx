import { Button, Text, View } from 'react-native';
import { useState } from 'react';
import AppNavigator from './src/cryptoCurrency/navigation/AppNavigator';
import AppNavigationCoin from './src/Currency/navigation/AppNavigationCoin';

export default function App() {

  const [isCryptoVisible, setIsCryptoVisible] = useState(true);
  
  return (
    <>
      {
        isCryptoVisible? <AppNavigator />: <AppNavigationCoin />
      }
    </>
  );
}