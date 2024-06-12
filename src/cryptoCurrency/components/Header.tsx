import { View, Image } from 'react-native';
import React from 'react';

import icons from '../../constants/icons';

import { FontAwesome } from "@expo/vector-icons";

export default function Header() {
return (
    <View className='flex-1 justify-center items-center mx-5'>
      <View className='w-full flex-row justify-between items-center'>
        <FontAwesome name="bitcoin" size={30} color="white"/>
          <Image 
              source={icons.notification} 
              style={{backgroundColor: 'white', height: 35, width: 35}}
          />
      </View>
    </View>
  )
}