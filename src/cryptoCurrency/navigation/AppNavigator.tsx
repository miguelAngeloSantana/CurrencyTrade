import { TouchableOpacity } from "react-native";

import Home from "../screen/Home";
import CriptoListas from "../screen/CriptoListas";
import Referencias from "../screen/Referencias";
import Perfil from "../screen/Perfil";
import { useAppDispatch, useAppSelector } from "../../redux/store";
// import Noticias from "../screen/Noticias";
import { changeVisibiliteModel } from "../../redux/currencySlice";
import TabIcons from "../components/TabIcons";
import icons from "../../constants/icons";


import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ReactNode } from "react";

interface paransTabButton {
    children: ReactNode 
    onPress(): void
};

const TabButtonsNaigator = createBottomTabNavigator();

const TabBarButtonCustom = ({ children, onPress }: paransTabButton) => {
    return (
        <TouchableOpacity className="flex-1 items-center justify-center" onPress={onPress}>
            {children}
        </TouchableOpacity>
    );
}

export const TabNavigation = () => {

    const dispatchTradeModel = useAppDispatch();
    const selectorTradeModel = useAppSelector(state => state.Currency.isTradeModelVisible)

    function isTradeModelButtonClickHundle(): void {
        dispatchTradeModel(changeVisibiliteModel(!selectorTradeModel));
    }

    return (
        <TabButtonsNaigator.Navigator 
            screenOptions={{
                    headerShown: false,
                    tabBarStyle: {height: 110, backgroundColor: 'black'},
                    tabBarShowLabel: false
                }}
        >
            <TabButtonsNaigator.Screen
                name="Principal" 
                component={Home} 
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (!selectorTradeModel) {
                            return (
                                <TabIcons
                                    focused={focused}
                                    icon={icons.home}
                                    label='Home'
                                    isTrade={false}
                                />
                            )
                        }
                    }
                }}
                listeners={{
                   tabPress: e => {
                    if (selectorTradeModel) {
                        e.preventDefault();
                    }
                   }
                }}
            />
            <TabButtonsNaigator.Screen 
                name="Market" 
                component={CriptoListas} 
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (!selectorTradeModel) {
                            return (
                                <TabIcons
                                    focused={focused}
                                    icon={icons.market}
                                    label='Market'
                                    isTrade={false}
                                />
                            )
                        }
                    }
                }}
                listeners={{
                    tabPress: e => {
                     if (selectorTradeModel) {
                         e.preventDefault();
                     }
                    }
                 }}
            />
            <TabButtonsNaigator.Screen 
                name="Trade" 
                component={Home} 
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TabIcons
                                focused={focused}
                                icon={selectorTradeModel? icons.close: icons.tradeIcon}
                                iconStyle={selectorTradeModel? {
                                    width: 35,
                                    height: 22
                                }: null}
                                label='Trade'
                                isTrade={true}
                            />              
                        )
                    },
                    tabBarButton: (props) => (
                        <TabBarButtonCustom 
                            {...props}
                            onPress={() => isTradeModelButtonClickHundle()}
                        />
                    )
                }}
            />
            <TabButtonsNaigator.Screen 
                name="Estudos" 
                component={Referencias} 
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (!selectorTradeModel) {
                            return (
                                <TabIcons
                                    focused={focused}
                                    icon={icons.study}
                                    label='Estudos'
                                    isTrade={false}
                                />
                            )
                        }
                    }
                }}
                listeners={{
                    tabPress: e => {
                     if (selectorTradeModel) {
                         e.preventDefault();
                     }
                    }
                 }}
            />
            <TabButtonsNaigator.Screen 
                name="Perfil" 
                component={Perfil}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (!selectorTradeModel) {
                            return (
                                <TabIcons
                                    focused={focused}
                                    icon={icons.profile}
                                    label='Perfil'
                                    isTrade={false}
                                />
                            )
                        }
                    }
                }} 
                listeners={{
                    tabPress: e => {
                     if (selectorTradeModel) {
                         e.preventDefault();
                     }
                    }
                 }}
            />
        </TabButtonsNaigator.Navigator>
    )
}