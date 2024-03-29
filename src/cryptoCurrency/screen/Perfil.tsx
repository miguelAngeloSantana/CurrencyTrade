import { View, Text } from 'react-native'
import React from 'react'
import LayoutPrincipal from './LayoutPrincipal'

export default function Perfil() {
  return (
    <LayoutPrincipal>
      <View className='flex flex-1 items-center justify-center'>
        <Text>Perfil</Text>
      </View>
    </LayoutPrincipal>
  )
}