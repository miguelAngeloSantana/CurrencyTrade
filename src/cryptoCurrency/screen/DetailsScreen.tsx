import { TouchableOpacity, Text, View, Image } from 'react-native';

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import Ionicons from "@expo/vector-icons/Ionicons";

import MainLayoutCrypto from './MainLayoutCrypto';
import { AppStackParams } from '../../../App';

type Props = NativeStackScreenProps<AppStackParams, "DetailsScreen">;

export default function DetailsScreen({ route, navigation }: Props) {
  // console.log(route.params);
  const detailsScreenPercentStyle = route.params.percentChange > 0 ? 'text-lime-400': 'text-red-600';
  
  return (
    <MainLayoutCrypto>
      <View className='flex flex-1'>
        <View className='flex flex-row items-center justify-center'>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 32, marginTop: 32 }}
          >
            <Ionicons name='chevron-back-outline' size={32} color={"white"}/>
          </TouchableOpacity>

          <Text className='flex flex-1 text-white text-xl font-bold text-center mt-8'>{route.params.name}</Text>
          <Text className='h-20 w-16'></Text> 
        </View>

        <View className='flex flex-col items-center justify-center mt-4'>
          <Image 
            source={{ uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${route.params.id.toString()}.png` }}
            resizeMethod='resize'
            className='w-20 h-20 mb-7 bg-gray-500'
          />

          <Text className='text-2xl text-gray-200 font-semibold mb-3'>
            {route.params.price?.toLocaleString(undefined, {
              style: "currency",
              currency: "BRL"
            })}
          </Text>
            
          <Text className={'text-base flex items-center justify-center ' + detailsScreenPercentStyle}>
            { route.params.percentChange > 0 ? "+" : "" }

            { route.params.percentChange?.toFixed(2) }%
          </Text>
        </View>
      </View>
    </MainLayoutCrypto>
  );
};

export function screenOptions({ navigation, route }:Props) {
  return {
    headerLeft: () => {
      return (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 4, backgroundColor: "red" }}
        >
          <Ionicons name='chevron-back-outline' size={24} color={"red"}/>
        </TouchableOpacity>
      )
    },
    title: route.params.name
  }
}