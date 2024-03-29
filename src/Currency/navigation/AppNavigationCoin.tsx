import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeFisica from "../screen/HomeFisica";
import ListaMoedas from "../screen/ListaMoedas";
import Notificacoes from "../screen/Notificacoes";
import Perfil from "../screen/Perfil";
// import Noticias from "../screen/Noticias";

const TabButtonsNaigatorCoin = createBottomTabNavigator();

const TabNavigationCoin = () => {
    return ( 
        // <NavigationContainer>
            <TabButtonsNaigatorCoin.Navigator screenOptions={{headerShown: false}}>
                <TabButtonsNaigatorCoin.Screen name="Principal" component={HomeFisica} />
                <TabButtonsNaigatorCoin.Screen name="ListaMoedas" component={ListaMoedas} />
                <TabButtonsNaigatorCoin.Screen name="Notificacoes" component={Notificacoes} />
                <TabButtonsNaigatorCoin.Screen name="Perfil" component={Perfil} />
            </TabButtonsNaigatorCoin.Navigator>
        // </NavigationContainer>
    )
}

export default function AppNavigationCoin() {
    return (
        <NavigationContainer>
            <TabNavigationCoin />
        </NavigationContainer>
    )
}