import { View, Text, Image, TouchableOpacity } from 'react-native';

import Animated, { FadeInDown } from 'react-native-reanimated';


export interface CryptoItemsProps {
    id: number
    name: string,
    symbol: string,
    price: number,
    percentChange: number
};

export const CryptoListItems = ({ id, name, symbol, price, percentChange }: CryptoItemsProps) => {

  return (
    <TouchableOpacity>
        <Animated.View 
            entering={FadeInDown.delay(100).duration(700).springify().damping(21)}
            className='flex-row justify-between items-center w-full h-20 p-4'
        >
            <View className='flex-row items-center'>
                <Image 
                    className='w-10 h-10 mr-4 bg-gray-500'
                    style={{ borderRadius: 16, borderWidth: 16 }}
                    source={{uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${id.toString()}.png`}}
                />
                <View>
                    <Text className='text-lg w-36 text-white'>{name}</Text>
                    <Text className='text-base text-gray-500'>{symbol}</Text>
                </View>
            </View>

            <View>
                <Text className='text-lg text-right text-white'>${price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
                </Text>
                <Text 
                    style={{ color: percentChange > 0 ? 'rgb(51 255 0)': 'rgb(251 44 44)' }}
                    className='text-base text-right'
                >
                    {percentChange > 0 ? '+' : ''}
                    {percentChange.toFixed(2)}%
                </Text>
            </View>
        </Animated.View>
    </TouchableOpacity>
  );
};