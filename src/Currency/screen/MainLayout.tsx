import React, { useState, ReactNode } from "react";
import { View, Animated, ActivityIndicator } from "react-native";

import { size } from "../../constants/dimensions";
import icons from "../../constants/icons";
import IconTextButtons from "../components/iconTextButtons";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { changeVisibiliteModel, renderChooseCurrency } from '../../redux/currencySlice';

interface PropsMainLayout {
    children: ReactNode 
}

export default function MainLayout({ children }: PropsMainLayout) {
    const dispatchCoinChoose = useAppDispatch();
    const selectorCoinChoose = useAppSelector(state => state.Currency.chooseCurrency);
    const changeCurrencySelector = useAppSelector(state => state.Currency.isTradeModelVisible);

    const [changeScreenCryptoCurrency, setChangeScreenCryptoCurrency] = useState(false);

    const modalAnimeted = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        if(changeCurrencySelector) {
            Animated.timing(modalAnimeted, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false
            }).start()
            
        }else {
            Animated.timing(modalAnimeted, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }).start()
        }
    }, [changeCurrencySelector])

    const modalY = modalAnimeted.interpolate({
        inputRange: [0, 1],
        outputRange: [size.height, size.height - 280]
    });

    const optionsCurrencyClickHandle = () => {
        if (selectorCoinChoose === "Currency") {
            setChangeScreenCryptoCurrency(true);

            setTimeout(() => {
                dispatchCoinChoose(renderChooseCurrency("CryptoCurrency"));
                dispatchCoinChoose(changeVisibiliteModel(false));
            }, 500)

        } else {
            dispatchCoinChoose(renderChooseCurrency("Currency"));
            setChangeScreenCryptoCurrency(false);
        }
    };

    return (
        <View className="flex-1">
            {changeScreenCryptoCurrency? <ActivityIndicator size={'large'} className='mt-20'/>: children}

            <Animated.View
                style={{
                    position: "absolute",
                    top: modalY,
                    left: 0,
                    width: "100%",
                    padding: 24,
                    backgroundColor: "#1C1C1C"
                }}
            >

                <IconTextButtons 
                    label="CryptoMoedas"
                    icon={icons.bitcoinLogo}
                    onPress={() => optionsCurrencyClickHandle()}
                />

                <IconTextButtons 
                    label="Moedas"
                    icon={icons.currency}
                    conteinerStyle={{
                        marginTop: 8
                    }}
                    onPress={() => optionsCurrencyClickHandle()}
                />
            </Animated.View>
        </View>
    )
}