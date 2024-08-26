import { View, ScrollView, TouchableOpacity, Text } from 'react-native';

import { listDataFilter } from '../../constants/listDataFilter';

interface DataFilterPriceProps {
  selectDayFilter: number 
  handleClickDayFiltred: (day: number) => void
};

export default function DataFilterPrice({ selectDayFilter, handleClickDayFiltred }: DataFilterPriceProps) {
  return (
    <View className='mt-2 px-3'>
      {
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className='space-x-4'
        >
          {
            listDataFilter.map((item, index) => {

              let isSelected = item.day === selectDayFilter;
              let isSelectedStyle = isSelected? "bg-zinc-500": "bg-transparent";

              return (
                <TouchableOpacity
                  key={index}
                  className='p-4 px-2 mr-1'
                  onPress={() => handleClickDayFiltred(item.day)}
                >
                  <Text className={'font-semibold text-white rounded-full p-4 ' + isSelectedStyle}>{item.time}</Text>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      }
    </View>
  );
};