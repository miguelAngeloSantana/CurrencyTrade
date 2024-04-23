import React, { useState, ReactNode } from 'react';
import { View, Animated, ActivityIndicator } from 'react-native';

import { size } from '../../constants/dimensions';
import icons from '../../constants/icons';
import { IconTextButton } from '../components/iconTextButton';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { changeVisibiliteModel, renderChooseCurrency } from '../../redux/currencySlice';

interface PropsLayout {
  children: ReactNode
}

export default function LayoutPrincipal({ children }: PropsLayout) {
  const dispatchChosenCurrency = useAppDispatch();
  const selectorChosenCurrency = useAppSelector(state => state.Currency.chooseCurrency);
  const changeScreenUseSelector = useAppSelector(state => state.Currency.isTradeModelVisible);

  const [chnageScreenCurrency, setChangeScreenCurrency] = useState(false);

  const modalAnimaationValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (changeScreenUseSelector) {
      Animated.timing(modalAnimaationValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false
      }).start();
    } else {
      Animated.timing(modalAnimaationValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false
      }).start();
    }
  }, [changeScreenUseSelector])

  const modalYValue = modalAnimaationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [size.height, size.height - 280]
  })


  const currencyClickHandle = () => {
    if (selectorChosenCurrency == "CryptoCurrency") {
      setChangeScreenCurrency(true);

      setTimeout(() => {
        dispatchChosenCurrency(renderChooseCurrency("Currency"));
        dispatchChosenCurrency(changeVisibiliteModel(false));
      }, 500);

      
    } else {
      dispatchChosenCurrency(renderChooseCurrency("CryptoCurrency"));
      setChangeScreenCurrency(false);
    }
  }

  return (
    <View className='flex-1'>
        {chnageScreenCurrency? <ActivityIndicator size={'large'} className='mt-20'/>: children}

        <Animated.View
          style={{
            position: "absolute",
            top: modalYValue,
            left: 0,
            width: "100%",
            padding: 24,
            backgroundColor: "#1C1C1C"
          }}
        >
          <IconTextButton 
            label="CryptoMoedas"
            icon={icons.bitcoinLogo}
            onPress={() => currencyClickHandle()}
          />

          <IconTextButton 
            label="Moedas"
            icon={icons.currency}
            conteinerStyle={{
              marginTop: 8
            }}
            onPress={() => currencyClickHandle()}
          />
        </Animated.View>
    </View>
  )
}