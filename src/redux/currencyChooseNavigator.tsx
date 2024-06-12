import { useSelector } from "react-redux";

import { TabNavigation } from "../cryptoCurrency/navigation/AppNavigator";
import {TabNavigationCoin} from "../Currency/navigation/AppNavigationCoin";
import { rootReducer } from "../redux/store";

export const CurrencyChooseNavigator = () => {
    const selectorChosenCurrency = useSelector((state: rootReducer) => state.Currency.chooseCurrency);

    return (
        <>
            {
                selectorChosenCurrency === "CryptoCurrency" ? <TabNavigation /> : <TabNavigationCoin />
            }
        </>
    );
};