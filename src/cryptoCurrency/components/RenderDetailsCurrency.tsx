import { View, Text } from 'react-native';

interface RenderDetailsProps {
  marketCap: number
  totVolume24: number
  high: number
  low: number
};

export default function RenderDetailsCurrency({ marketCap, totVolume24, high, low }: RenderDetailsProps) {
  return (
    <>
      <View className='w-40 mt-10'>
        <Text className='text-gray-300 text-xs mb-1'>Market Cap</Text>
        <Text className='text-gray-200 font-bold text-sm'>
          {marketCap.toLocaleString(undefined, {
            style: "currency",
            currency: "BRL"
          })}
        </Text>
      </View>

      <View className='w-40 mt-4'>
        <Text className='text-gray-300 text-xs mb-1'>Volume (24h)</Text>
        <Text className='text-gray-200 font-bold text-sm'>
          {totVolume24.toLocaleString(undefined, {
            style: "currency",
            currency: "BRL"
          })}
        </Text>
      </View>

      <View className='w-40 mt-4'>
        <Text className='text-gray-300 text-xs mb-1'>High (24h)</Text>
        <Text className='text-gray-200 text-bold text-sm'>
          {high.toLocaleString(undefined, {
            style: "currency",
            currency: "BRL"
          })}
        </Text>
      </View>

      <View className='w-40 mt-4'>
        <Text className='text-gray-300 text-xs mb-1'>Low (24h)</Text>
        <Text className='text-gray-200 text-bold text-sm'>
          {low.toLocaleString(undefined, {
            style: "currency",
            currency: "BRL"
          })}
        </Text>
      </View> 
    </>
  );
};