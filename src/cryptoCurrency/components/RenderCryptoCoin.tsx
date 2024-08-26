import { View, ListRenderItemInfo, FlatList, ScrollView } from 'react-native';

import ModelCryptoCoin from '../modelos/ModelCryptoCoin';

import { CryptoItemsProps } from './CryptoListItems';
import { RenderCryptoCoinListItems } from './RenderCryptoCoinListItems';
import { DetailsScreenNavigation } from '../screen/CryptoCoinLists';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
interface CryptoCoinData {
    cryptoCoinDataList: ModelCryptoCoin[]
    navigation: DetailsScreenNavigation
};

export default function RenderCryptoCoin({ cryptoCoinDataList, navigation }: CryptoCoinData){
  
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
  function renderItems({ item }: ListRenderItemInfo<CryptoItemsProps>) {
    return (
      <RenderCryptoCoinListItems 
        id={item.id}
        name={item.name}
        symbol={item.symbol}
        price={item.price}
        percentChange={item.percentChange}
        navigation={navigation}
      />
    );
  };
  return (
    <View className='mt-4 px-3 w-full'>
      {
        cryptoCoinDataList.length === 0 ? (
          <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 16 }}
            >
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
            </ScrollView>
        ): (
          <FlatList 
            data={cryptoCoinDataList}
            keyExtractor={item => item.symbol}
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: 18 }}
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={100}
            initialNumToRender={10}
            windowSize={11}
            renderItem={renderItems}
         />
        )
      }
      
    </View>
  );
};