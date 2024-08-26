import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import { listCategoires } from "../../constants/listCategoires";

interface CategoriesProps {
  selecteCategorie: number
  handleClickCategorie: (index: number, categoria:string) => void
};

export default function Categories({ selecteCategorie, handleClickCategorie }: CategoriesProps) {

  return (
    <View className='mt-2 px-3'>

      {
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className='space-x-4'
        >
          {
            listCategoires.map((item, index) => {

              let isClick = item.id === selecteCategorie;
              let clickCategorieStyle = isClick? 'text-gray-200': 'text-gray-500';

              return (
                <TouchableOpacity
                  key={index}
                  className='p-4 px-2 mr-1'
                  onPress={() => handleClickCategorie(item.id, item.title)}
                >
                  <Text
                    className={'font-semibold ' + clickCategorieStyle}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      }
    </View>
  );
};