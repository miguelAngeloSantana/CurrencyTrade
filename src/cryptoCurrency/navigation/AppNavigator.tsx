import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screen/Home";
import CriptoListas from "../screen/CriptoListas";
import Referencias from "../screen/Referencias";
import Perfil from "../screen/Perfil";
import TabIcons from "../components/TabIcons";
import icons from "../../constants/icons";
import { TouchableOpacity } from "react-native";
// import Noticias from "../screen/Noticias";

const TabButtonsNaigator = createBottomTabNavigator();

// interface paransTabButton {
//     children: string
// }

const TabBarButtonCustom = ({ children }) => {
    return (
        <TouchableOpacity className="flex-1 items-center justify-center" onPress={() => console.log('trade pressionado')}>
            {children}
        </TouchableOpacity>
    );
}

const TabNavigation = () => {
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
                        return (
                            <TabIcons
                                focused={focused}
                                icon={icons.home}
                                label='Home'
                                isTrade={false}
                            />
                        )
                    }
                }}
            />
            <TabButtonsNaigator.Screen 
                name="Market" 
                component={CriptoListas} 
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TabIcons
                                focused={focused}
                                icon={icons.market}
                                label='Market'
                                isTrade={false}
                            />
                        )
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
                                icon={icons.tradeIcon}
                                label='Trade'
                                isTrade={true}
                            />
                        )
                    },
                    tabBarButton: (props) => (
                        <TabBarButtonCustom {...props}/>
                    )
                }}
            />
            <TabButtonsNaigator.Screen 
                name="Estudos" 
                component={Referencias} 
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TabIcons
                                focused={focused}
                                icon={icons.study}
                                label='Estudos'
                                isTrade={false}
                            />
                        )
                    }
                }}
            />
            <TabButtonsNaigator.Screen 
                name="Perfil" 
                component={Perfil}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TabIcons
                                focused={focused}
                                icon={icons.profile}
                                label='Perfil'
                                isTrade={false}
                            />
                        )
                    }
                }} 
            />
        </TabButtonsNaigator.Navigator>
    )
}

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <TabNavigation />
        </NavigationContainer>
    )
}