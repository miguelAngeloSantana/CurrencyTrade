import { View, ListRenderItemInfo, FlatList } from 'react-native';

import ModelCryptoCoin from '../modelos/ModelCryptoCoin';

import { CryptoItemsProps } from './CryptoListItems';
import { RenderCryptoCoinListItems } from './RenderCryptoCoinListItems';

interface CryptoCoinData {
    cryptoCoinDataList: ModelCryptoCoin[]
};

export default function RenderCryptoCoin({ cryptoCoinDataList }: CryptoCoinData){

  function renderItems({ item }: ListRenderItemInfo<CryptoItemsProps>) {
    return (
      <RenderCryptoCoinListItems 
        id={item.id}
        name={item.name}
        symbol={item.symbol}
        price={item.price}
        percentChange={item.percentChange}
      />
    );
  };
  

  return (
    <View className='mt-4 px-3 w-full'>
      
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

    </View>
  );
};