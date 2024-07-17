import { StatusBar, View, FlatList, SafeAreaView } from "react-native";
import { useEffect } from "react";

import { StackNavigationProp } from "@react-navigation/stack";

import MainLayoutCrypto from "./MainLayoutCrypto";

import { CryptoCoin } from "../features/cryptoCoin/CryptoCoin";
import { CryptoMovers } from "../features/topMoversCrypto/CryptoMovers";
import { CryptoNews } from "../features/cryptoNews/CryptoNews";

import CryptoList from "../components/CryptoList";
import TopMoversList from "../components/TopMoversList";
import NewsList from "../components/NewsList";


import { useAppDispatch, useAppSelector } from "../../redux/store";

import { RootStackParams } from "../navigation/AppNavigator";

type HomeScreenNavigationProps = StackNavigationProp<
  RootStackParams,
  "HomeScreen"
>;

interface Props {
  navigation: HomeScreenNavigationProps;
};

export default function Home({ navigation }: Props) {

  const dispatchCryptoCoin = useAppDispatch();

  const selectorCryptoCoin = useAppSelector((state) => state.CryptoCoin.listCoin);
  const selectorTopMoversCrypto = useAppSelector((state) => state.topMoversCrypto.topMoversData);
  const selectorNews = useAppSelector((state) => state.News.newsData);
  
  const loadDate = () => {
    try {
      dispatchCryptoCoin(CryptoCoin());
      dispatchCryptoCoin(CryptoMovers());
      dispatchCryptoCoin(CryptoNews());
    } catch (error) {
      console.log("Deu pane: ", error);
    }
  };

  const viewMoreHandle = () => {
    navigation.navigate("News");
  };

  const dataLoad = [
    <CryptoList coinData={selectorCryptoCoin} />,
    <TopMoversList cryptoCoinData={selectorTopMoversCrypto} />,
    <NewsList newsListDate={selectorNews} isHomeScreen={true} viewMoreHandle={viewMoreHandle} />
  ];

  useEffect(() => {
    loadDate();
  }, [dispatchCryptoCoin]);

  return ( 
    <MainLayoutCrypto>
      <StatusBar barStyle="light-content" />
      <SafeAreaView className="flex-1 items-center justify-center mt-4 space-y-6">

        <FlatList
          data={dataLoad}
          keyExtractor={(item, index) => String(index)}
          renderItem={(children) => {
            return <View>{children.item}</View>;
          }}
        />
      </SafeAreaView>
    </MainLayoutCrypto>
  );
};

export const screenOptions = () => {
  return {
    headerShown: false,
  };
};