import { View, Text, Image, TouchableOpacity } from 'react-native';
import { DetailsScreenNavigation } from '../screen/CryptoCoinLists';
export interface CryptoListItemProps {
    id: number
    name: string,
    symbol: string,
    price: number,
    percentChange: number
    navigation: DetailsScreenNavigation
};


export const RenderCryptoCoinListItems = ({ id, name, symbol, price, percentChange, navigation }: CryptoListItemProps) => {
    let stylePercentChange = percentChange > 0? 'text-lime-400': 'text-red-600';

  return (
    <TouchableOpacity
        onPress={() => navigation.navigate("DetailsScreen", { name: name, id: id, price: price, percentChange: percentChange })}
    >
        <View className='flex-row items-center justify-between w-full h-20 p-4'>
            <View className='flex-row items-center'>
                <Image 
                    source={{ uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${id.toString()}.png` }}
                    resizeMethod='resize'
                    style={{ borderRadius: 16, borderWidth: 16 }}
                    className='w-10 h-10 mr-4 bg-gray-500'
                />

                <View>
                    <Text className='text-lg w-36 text-gray-200'>
                        { name.length > 15? name.slice(0, 16) + "...": name }
                    </Text>
                    <Text className='text-base text-gray-500'>( {symbol} )</Text>
                </View>
            </View>

            <View>
                <Text className='text-lg text-right text-gray-200'>
                    {price?.toLocaleString(undefined, {
                        style: 'currency',
                        currency: 'BRL'
                    })}
                </Text>
                
                <Text
                    className={'text-base text-right ' + stylePercentChange}
                >
                    { percentChange > 0? '+': '' }
                    { percentChange?.toFixed(2) }%
                </Text>
            </View>
        </View>
    </TouchableOpacity>
  );
};