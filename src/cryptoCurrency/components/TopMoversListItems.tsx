import { View, Text, TouchableHighlight, Image, Animated } from 'react-native';

export interface TopMoversListItemsProps {
    id: number 
    symbol: string 
    price: number 
    percentChange: number
};


export default function TopMoversListItems({ id, symbol, price, percentChange }: TopMoversListItemsProps) {

    const animetedValue = new Animated.Value(1);

    const handlePressIn = () => {
        Animated.spring(animetedValue, {
            toValue: 0.98,
            useNativeDriver: true
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(animetedValue, {
            toValue: 1,
            useNativeDriver: true
        }).start();
    };

    const animetedStyle = {
        transform: [{ scale: animetedValue }],
    };

  return (
    <TouchableHighlight
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        // underlayColor="#E0E0E0"
        className='w-40 mr-4'
        activeOpacity={0.7}
    >
        <Animated.View 
            className='w-40 py-7 px-4 border-zinc-800'
            style={[{ borderWidth: 1, borderRadius: 8}, animetedStyle]}
        >
            <Image 
                className='w-8 h-8 mb-4'
                style={{ borderRadius: 10, borderWidth: 0.5 }}
                source={{uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${id.toString()}.png`}}
            />

            <View className='flex-row items-center px-3'>
                <Text className='text-base font-semibold mr-1 text-gray-500'>{symbol}</Text>
                <Text className='text-base text-white'>
                    $
                    {price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </Text>
            </View>

            <View>
                <Text 
                    className='text-2xl mt-1'
                    style={{ color: percentChange > 0 ? 'rgb(51 255 0)': 'rgb(251 44 44)' }}
                >
                    {percentChange > 0 ? '+' : ''}
                    {percentChange.toFixed(2)}%
                </Text>
            </View>
        </Animated.View>
    </TouchableHighlight>
  );
};