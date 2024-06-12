import { useEffect, useState, useRef, ReactNode } from "react";
import { View, Animated, ActivityIndicator } from "react-native";

import { IconTextButton } from "../components/iconTextButton";
import { useAppDispatch, useAppSelector } from "../../redux/store";

import { changeVisibiliteModel, renderChooseCurrency } from "../../redux/currencySlice";

import { size } from "../../constants/dimensions";
import icons from "../../constants/icons";

interface PropsLayout {
  children: ReactNode;
};

export default function MainLayoutCrypto({ children }: PropsLayout) {
  const dispatchChosenCurrency = useAppDispatch();

  const selectorChosenCurrency = useAppSelector(
    (state) => state.Currency.chooseCurrency
  );

  const changeScreenUseSelector = useAppSelector(
    (state) => state.Currency.isTradeModelVisible
  );

  const [changeScreenCurrency, setChangeScreenCurrency] = useState(false);

  const modalAnimaationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (changeScreenUseSelector) {
      Animated.timing(modalAnimaationValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimaationValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [changeScreenUseSelector]);

  const modalYValue = modalAnimaationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [size.height, size.height - 280],
  });

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
  };

  return (
    <View className="flex-1 bg-theme-black-main">
      {changeScreenCurrency ? ( <ActivityIndicator size={"large"} className="mt-20" /> ) : ( children )}

      {changeScreenUseSelector && (
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "black",
          }}
        />
      )}

      <Animated.View
        style={{
          position: "absolute",
          top: modalYValue,
          left: 0,
          width: "100%",
          padding: 24,
          backgroundColor: "#1C1C1C",
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
            marginTop: 8,
          }}
          onPress={() => currencyClickHandle()}
        />
      </Animated.View>
    </View>
  );
};