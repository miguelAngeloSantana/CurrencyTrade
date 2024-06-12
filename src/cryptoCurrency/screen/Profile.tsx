import { View, Text } from 'react-native';

import MainLayoutCrypto from './MainLayoutCrypto';

export default function Profile() {
  return (
    <MainLayoutCrypto>
      <View className='flex flex-1 items-center justify-center'>
        <Text>Perfil</Text>
      </View>
    </MainLayoutCrypto>
  );
};