import { View, Text, FlatList, ListRenderItemInfo, ScrollView } from 'react-native';

import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';

import TopMoversListItems, { TopMoversListItemsProps } from './TopMoversListItems';

import ModelCryptoCoin from '../modelos/ModelCryptoCoin';

interface TopMoversListProps {
  cryptoCoinData: ModelCryptoCoin[]
};

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const Skeleton = () => {
  return (
    <View 
      className='w-40 py-7 px-4 border-zinc-800 mr-4'
      style={{ borderRadius: 12, borderWidth: 0.5 }}
    >
      <ShimmerPlaceholder //Imagem
        shimmerStyle={{ width: 52, height: 52, marginBottom: 16 }}
      />

      <View className='flex-row items-center'>
        <ShimmerPlaceholder //Simbolo
          shimmerStyle={{ width: '35%', height: 20,  marginRight: 12  }}
        />

        <ShimmerPlaceholder // Preço
          shimmerStyle={{ width: '28%', height: 24 }}
        />
      </View>

      <View>
        <ShimmerPlaceholder //Porcentagem de ganho
          shimmerStyle={{ width: '56%', height: 28, marginTop: 16 }}
        />
      </View>
    </View>
  );
};

export default function TopMoversList({ cryptoCoinData }: TopMoversListProps) {

  function renderItem({ item }: ListRenderItemInfo<TopMoversListItemsProps>) {
    return (
      <TopMoversListItems 
        id={item.id}
        symbol={item.symbol}
        price={item.price}
        percentChange={item.percentChange}
      />
    );
  };

  return (
    <View className='flex w-full self-start mt-7 pb-7'>
      <Text 
        className='font-semibold text-xl text-white mt-8 mb-3' 
        style={{ marginLeft: "6%" }}
      >
        Movimentações mais Altas
      </Text>

      {
        cryptoCoinData.length === 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: 16, display: 'flex', flexDirection: 'row', height: 200, paddingLeft: '6%', marginRight: 16
            }}
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
            data={cryptoCoinData}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            snapToOffsets={[...Array(cryptoCoinData.length)].map((x, i) => 158 * i * 162)}
            decelerationRate={0}
            snapToAlignment='center'
            contentContainerStyle={{height: 160, paddingLeft: "6%"}}
            renderItem={renderItem}
          />
        )
      }

      {/* {
        cryptoCoinData.length === 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ 
              marginRight: 16, paddingVertical: 16, display: 'flex', flexDirection: 'row', height: 200, paddingLeft: "6%"
            }}
          >
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </ScrollView>
        ) : (
          <FlatList 
            data={cryptoCoinData}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            snapToOffsets={[...Array(cryptoCoinData.length)].map((x, i) => 158 * i * 162)}
            decelerationRate={0}
            snapToAlignment='center'
            contentContainerStyle={{height: 160, paddingLeft: "6%"}}
            renderItem={renderItem}
          />
        )
      }; */}
    </View>
  );
}