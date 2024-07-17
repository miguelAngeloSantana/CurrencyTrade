import { View } from 'react-native';

import { StackNavigationProp, TransitionSpecs } from "@react-navigation/stack";

import Ionicons from "@expo/vector-icons/Ionicons";

import NewsList from '../components/NewsList';
import { useAppSelector } from '../../redux/store';
import { RootStackParams } from '../navigation/AppNavigator';
import { TouchableOpacity } from 'react-native-gesture-handler';

type NewsScreenNavigationProps = StackNavigationProp<
  RootStackParams, 
  "News"
>;

type Props = {
  navigation: NewsScreenNavigationProps
};

export default function News() {

  const dataNews = useAppSelector((state) => state.News.newsData);

  return (
    <View className='flex-1 items-center justify-center bg-theme-black-main'>
      <NewsList 
        newsListDate={dataNews}
        isHomeScreen={false}
      />
    </View>
  );
};

export const screenOptions = ({ navigation }: Props) => {
  return {
    headerLeft: () => {
      return (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 4 }}
        >
          <Ionicons name="chevron-back-outline" size={24} />
        </TouchableOpacity>
      );
    }
  };
};
