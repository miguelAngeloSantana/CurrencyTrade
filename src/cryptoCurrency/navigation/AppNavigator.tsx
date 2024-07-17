import { TouchableOpacity } from "react-native";
import { ReactNode } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen, { screenOptions as HomeOptions } from "../screen/Home";
import NewsScreen, { screenOptions as NewsOptions } from "../screen/News";
import CriptoCoinLists from "../screen/CryptoCoinLists";
import References from "../screen/References";
import Profile from "../screen/Profile";

import TabIcons from "../components/TabIcons";
import icons from "../../constants/icons";

import { useAppDispatch, useAppSelector } from "../../redux/store";
import { changeVisibiliteModel } from "../../redux/currencySlice";

interface paransTabButton {
    children: ReactNode 
    onPress(): void
};

export type RootStackParams = {
    HomeScreen: undefined
    News: undefined
    CryptoList: undefined
};

const StackNavigation = createStackNavigator<RootStackParams>();


const HomeNavigation = () => {
    return (
        <StackNavigation.Navigator screenOptions={NewsOptions}>
            <StackNavigation.Screen name="HomeScreen" component={HomeScreen} options={HomeOptions} />
            <StackNavigation.Screen name="News" component={NewsScreen} />
        </StackNavigation.Navigator>
    );
};

const TabButtonsNaigator = createBottomTabNavigator();

const TabBarButtonCustom = ({ children, onPress }: paransTabButton) => {
    return (
        <TouchableOpacity className="flex-1 items-center justify-center" onPress={onPress}>
            {children}
        </TouchableOpacity>
    );
};

export const TabNavigation = () => {

    const dispatchTradeModel = useAppDispatch();
    const selectorTradeModel = useAppSelector(state => state.Currency.isTradeModelVisible);

    function isTradeModelButtonClickHundle(): void {
        dispatchTradeModel(changeVisibiliteModel(!selectorTradeModel));
    };

    return (
        <TabButtonsNaigator.Navigator 
            initialRouteName="Principal"
            screenOptions={{
                headerShown: false,
                tabBarStyle: {height: 110, backgroundColor: 'black'},
                tabBarShowLabel: false
            }}
        >
            <TabButtonsNaigator.Screen
                name="Principal" 
                component={HomeNavigation} 
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
                component={CriptoCoinLists} 
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
                component={HomeScreen} 
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TabIcons
                                focused={focused}
                                icon={selectorTradeModel ? icons.close: icons.tradeIcon}
                                iconStyle={selectorTradeModel? {
                                    width: 30,
                                    height: 30,
                                }: undefined}
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
                component={References} 
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
                component={Profile}
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
    );
};