import { View, Text, Image, TouchableOpacity } from 'react-native';

import Animated, { FadeInDown } from "react-native-reanimated";

import * as WebBrowser from "expo-web-browser";

export interface NewsListProps {
  newsOutlet: string 
  date: string 
  title: string 
  image: string 
  url: string 
};

export const NewsListItems = ({ newsOutlet, date, title, image, url }: NewsListProps) => {

  const handlePress = async (url: string) => {
    await WebBrowser.openBrowserAsync(url, {
      readerMode: true,
      controlsColor: "#404040",
      dismissButtonStyle: "close",
      toolbarColor: "black"
    });
  };

  return (
    <TouchableOpacity
      className='justify-center rounded-lg'
      style={{ paddingHorizontal: "4%", paddingVertical: "4%" }}
      onPress={() => handlePress(url)}
    >
      <Animated.View 
        entering={FadeInDown.delay(300).duration(700).springify().damping(21)}
        className='flex-row justify-between'
      >
        <View style={{ width: "75%" }}>
          <Text className='text-gray-300 text-base mb-2'>
            {newsOutlet} <Text className='font-bold text-lg'>+</Text> {date}
          </Text>
          <Text selectable className='text-gray-100' style={{ lineHeight: 25, fontSize: 17 }}>{title}</Text>
        </View>

        <Image
          source={{uri: image}}
          className='w-16 h-16'
          style={{ borderRadius: 8, borderWidth: 0.5, borderColor: "#404040", alignSelf: "center" }}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};