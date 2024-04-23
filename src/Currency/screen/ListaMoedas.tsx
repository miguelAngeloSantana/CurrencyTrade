import { View, Text } from 'react-native'
import React from 'react' 
import MainLayout from './MainLayout'

export default function ListaMoedas() {
  return (
    <MainLayout>
      <View className='flex flex-1 items-center justify-center'>
        <Text>ListaMoedas</Text>
      </View>
    </MainLayout>
  )
}