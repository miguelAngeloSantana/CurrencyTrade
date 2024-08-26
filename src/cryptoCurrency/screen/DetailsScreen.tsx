import { TouchableOpacity, Text, View, Image, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';

import Ionicons from "@expo/vector-icons/Ionicons";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppStackParams } from '../../../App';

import enVariable from '../../utils/enVariable';

import MainLayoutCrypto from './MainLayoutCrypto';

import LineChar from '../components/LineChar';
import DetailsCurrency from '../components/DetailsCurrency';
import DataFilterPrice from '../components/dataFilterPrice';

type Props = NativeStackScreenProps<AppStackParams, "DetailsScreen">;

export default function DetailsScreen({ route, navigation }: Props) {

  const [ historyCryptoCoin, setHistoryCryptoCoin ] = useState();
  const [ selectDayFilter, setSelectDayFilter ] = useState(7);


  async function fetchCoinHistoryPrice(){

    await fetch(`https://api.coingecko.com/api/v3/coins/${route.params.name.toLocaleLowerCase()}/market_chart?vs_currency=usd&days=${selectDayFilter}&x_cg_demo_api_key=${enVariable.API_KEY_COIN}`)
      .then((response) => response.json())
      .then((data) => setHistoryCryptoCoin(data.prices))
      .catch(err => console.log(err))
  };


  function handleClickDayFiltred(day: number) {
    setSelectDayFilter(day);
  };

  useEffect(() => {
    fetchCoinHistoryPrice();
  }, [selectDayFilter]);

  const detailsScreenPercentStyle = route.params.percentChange > 0 ? 'text-lime-400': 'text-red-600';
  
  return (
    <MainLayoutCrypto>
      <ScrollView
        className='flex-1'
        contentContainerStyle={{ alignItems: "center" }}
      >
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

        <View className='flex flex-1 w-full justify-center mt-9 px-3'>
          <View className='flex justify-center mx-auto'>
            <DataFilterPrice selectDayFilter={selectDayFilter} handleClickDayFiltred={handleClickDayFiltred}/>
          </View>
          <LineChar coinHistory={historyCryptoCoin} price={route.params.price} selectDayFilter={selectDayFilter}/>
        </View>

        <View>
            <DetailsCurrency symbol={route.params.symbol} name={route.params.name}/>
        </View>

      </ScrollView>
    </MainLayoutCrypto>
  );
};

// export function screenOptions({ navigation, route }:Props) {
//   return {
//     headerLeft: () => {
//       return (
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={{ marginLeft: 4, backgroundColor: "red" }}
//         >
//           <Ionicons name='chevron-back-outline' size={24} color={"red"}/>
//         </TouchableOpacity>
//       )
//     },
//     title: route.params.name
//   }
// }