import { View, Text, FlatList, ListRenderItemInfo, ScrollView } from 'react-native';

import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

import ModelCryptoCoin from '../modelos/ModelCryptoCoin';
import { CryptoItemsProps, CryptoListItems } from './CryptoListItems';


const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

interface CryptoListProps {
  coinData: ModelCryptoCoin[];
};

const Skeleton = () => {
  return (
    <View 
      className='overflow-hidden flex-row justify-between items-center p-4 h-20'
      style={{ borderRadius: 8, borderColor: "#1C1C1C", borderWidth: 4 }}
    >

      <View className='flex-row items-center mr-2'>
        <ShimmerPlaceholder //image
          shimmerStyle={{ width: 60, height: 60, borderRadius: 50, borderColor: "#363636", marginRight: 16 }}
        />

        <View>
          <ShimmerPlaceholder //nome
            shimmerStyle={{ width: '30%', height: 16, marginTop: 8 }}
          />

          <ShimmerPlaceholder //simbolo
            shimmerStyle={{ width: '15%', height: 16, marginTop: 8 }}
          />
          </View>
      </View>

      <View>
        <ShimmerPlaceholder //preço
          shimmerStyle={{ width: '25%', height: 16 }}
        />

        <ShimmerPlaceholder //procentagem de ganho
          shimmerStyle={{ width: '18%', height: 18, marginTop: 8 }}
        />
      </View>
    </View>
  );
};

export default function CryptoList({ coinData }: CryptoListProps) {

  function renderItem({ item }: ListRenderItemInfo<CryptoItemsProps>) {
    return ( 
      <CryptoListItems 
        id={item.id}
        name={item.name}
        symbol={item.symbol}
        price={item.price}
        percentChange={item.percentChange}
      />
    );
  };

  return (
    <View className='w-full items-center justify-center '>
      <View className='flex-row justify-between items-center mx-5 mt-2'
        style={{ width: '90%' }}
      > 
        <Text className='text-white'>Portifolio</Text>
        <Text className='text-white'>+</Text>
      </View>
      <View style={{ width: "90%" }}>

        {
          coinData.length === 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 16 }}
            >
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </ScrollView>
          ): (
            <FlatList 
              data={coinData}
              keyExtractor={( item ) => item.symbol}
              showsVerticalScrollIndicator={false}
              style={{ marginBottom: 8 }}
              renderItem={renderItem}
            /> 
          )
        }
      </View>
    </View>
  );
};