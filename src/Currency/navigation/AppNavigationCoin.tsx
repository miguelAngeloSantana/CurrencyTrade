import { TouchableOpacity } from "react-native";
import { ReactNode } from "react";

import icons from "../../constants/icons";
import HomeFisica from "../screen/HomeFisica";
import ListaMoedas from "../screen/ListaMoedas";
import Notificacoes from "../screen/Notificacoes";
import Perfil from "../screen/Perfil";
// import Noticias from "../screen/Noticias";
import { changeVisibiliteModel } from "../../redux/currencySlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import TabButtonsIcons from "../components/tabButtonsIcons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

interface PropsTabButton {
    children: ReactNode
    onPress(): void
};

const TabButtonsNaigatorCoin = createBottomTabNavigator();

const TabBarButtonCustom = ({ children, onPress }: PropsTabButton) => {
    return (
        <TouchableOpacity className="flex-1 items-center justify-center" onPress={onPress}>
            {children}
        </TouchableOpacity>
    );
}

export const TabNavigationCoin = () => {

    const coinDispatch = useAppDispatch();
    const coinSelector = useAppSelector(state => state.Currency.isTradeModelVisible);

    function tradeVisibleHandleClick(): void {
        coinDispatch(changeVisibiliteModel(!coinSelector))
    }

    return ( 
        <TabButtonsNaigatorCoin.Navigator 
            screenOptions={{
                headerShown: false,
                tabBarStyle: {height: 110, backgroundColor:"black"},
                tabBarShowLabel: false
            }}
        >
            <TabButtonsNaigatorCoin.Screen 
                name="Principal" 
                component={HomeFisica}
                options={{
                    tabBarIcon: ({focused}) => {
                        return (
                            <TabButtonsIcons 
                                focused={focused}
                                icon={icons.home}
                                label="Home"
                                isTrade={false}
                            />
                        )
                    }
                }} 
                listeners={{
                    tabPress: e => {
                        if (coinSelector) {
                            e.preventDefault();
                        }
                    }
                }}
            />

            <TabButtonsNaigatorCoin.Screen 
                name="Market" 
                component={ListaMoedas} 
                options={{
                    tabBarIcon: ({focused}) => {
                        return (
                            <TabButtonsIcons 
                                focused={focused}
                                icon={icons.market}
                                label="Market"
                                isTrade={false}
                            />
                        )
                    }
                }} 
                listeners={{
                    tabPress: e => {
                        if (coinSelector) {
                            e.preventDefault();
                        }
                    }
                }}
            />

            <TabButtonsNaigatorCoin.Screen 
                name="Trade" 
                component={HomeFisica}
                options={{
                    tabBarIcon: ({focused}) => {
                        return (
                            <TabButtonsIcons 
                                focused={focused}
                                icon={coinSelector? icons.close: icons.tradeIcon}
                                iconStyle={coinSelector? {
                                    width: 35,
                                    height: 22
                                }: null}
                                label="Trade"
                                isTrade={true}
                            />
                        )
                    },
                    tabBarButton: (props) => (
                        <TabBarButtonCustom 
                            {...props}
                            onPress={() => tradeVisibleHandleClick()}
                        />
                    )
                }}
            />

            <TabButtonsNaigatorCoin.Screen 
                name="notification" 
                component={Notificacoes} 
                options={{
                    tabBarIcon: ({focused}) => {
                        return (
                            <TabButtonsIcons 
                                focused={focused}
                                icon={icons.notification}
                                label="notification"
                                isTrade={false}
                            />
                        )
                    }
                }} 
                listeners={{
                    tabPress: e => {
                        if (coinSelector) {
                            e.preventDefault();
                        }
                    }
                }}
            />

            <TabButtonsNaigatorCoin.Screen 
                name="Perfil" 
                component={Perfil} 
                options={{
                    tabBarIcon: ({focused}) => {
                        return (
                            <TabButtonsIcons 
                                focused={focused}
                                icon={icons.profile}
                                label="perfil"
                                isTrade={false}
                            />
                        )
                    }
                }} 
                listeners={{
                    tabPress: e => {
                        if (coinSelector) {
                            e.preventDefault();
                        }
                    }
                }}    
            />
        </TabButtonsNaigatorCoin.Navigator>
    )
}