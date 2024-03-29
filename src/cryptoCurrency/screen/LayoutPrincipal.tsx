import { View } from 'react-native'
import React from 'react'

export default function LayoutPrincipal({ children }) {
  return (
    <View className='flex-1'>
        {children}
    </View>
  )
}