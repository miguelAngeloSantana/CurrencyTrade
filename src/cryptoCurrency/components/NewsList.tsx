import { View, Text, FlatList, TouchableOpacity, ListRenderItemInfo, ScrollView } from 'react-native';

import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';

import ModelNews from '../modelos/ModelNews';
import { NewsListItems, NewsListProps } from './NewsListItems';

interface NewsProps {
    newsListDate: ModelNews[]
    isHomeScreen: boolean
    viewMoreHandle?: any
};

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);


const Skeleton = () => {
  return (
    <View 
      className='flex-row justify-between items-center p-4'
    >
      <View style={{ width: "75%", marginRight: 12 }}>
        <ShimmerPlaceholder //Site e Data
          shimmerStyle={{ width: '35%', height: 16, marginTop: 8, marginBottom: 8 }}
        />

        <ShimmerPlaceholder //Titulo
          shimmerStyle={{ width: "100%", height: 72}}
        />
      </View>

      <ShimmerPlaceholder //Imagem
        shimmerStyle={{ width: "20%", height: 60 }}
      />
    </View>
  );
};

export default function NewsList({ newsListDate, isHomeScreen, viewMoreHandle }: NewsProps) {
  function renderItem({ item }: ListRenderItemInfo<NewsListProps>) {
    return (
      <NewsListItems 
        newsOutlet={item.newsOutlet}
        date={item.date}
        title={item.title}
        image={item.image}
        url={item.url}
      />
    );
  };

  return (
    <View className='w-full self-center mt-4'>
      {isHomeScreen && (
        <View 
          className='flex-row items-center justify-between mb-3 mt-5' 
          style={{marginHorizontal: "6%"}}
        >
          <Text className='text-xl text-white font-semibold'>Últimas Notícias</Text>
            <TouchableOpacity onPress={viewMoreHandle}>
              <Text className='text-base font-semibold text-blue-500'>Maís notícicas</Text>
            </TouchableOpacity>
        </View>
      )}

      {
        newsListDate.length === 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ 
              paddingVertical: 16
            }}
          >
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </ScrollView>
        ): (
          <FlatList
            data={isHomeScreen ? newsListDate.slice(0,5) : newsListDate}
            keyExtractor={(item) => item.url}
            showsVerticalScrollIndicator={false}
            style={{ marginHorizontal: 8 }}
            renderItem={renderItem}
          />
        )
      }
    </View>
  );
};