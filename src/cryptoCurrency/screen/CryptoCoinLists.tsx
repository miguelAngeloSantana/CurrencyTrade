import { View, Text, TextInput, StatusBar, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';

import { StackNavigationProp } from '@react-navigation/stack';

import Feather from "@expo/vector-icons/Feather";

import MainLayoutCrypto from './MainLayoutCrypto';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import { cryptCoinList } from '../features/cryptoCoinList/cryptoCoinList';
import { cryptoCoinListActions } from '../features/cryptoCoinList/cryptoCoinListSlice';

import Categories from "../components/categories"
import RenderCryptoCoin from '../components/RenderCryptoCoin';

import { AppStackParams } from '../../../App';

export type DetailsScreenNavigation = StackNavigationProp<
    AppStackParams,
    "DetailsScreen"
>;
interface DetailsScreenProps {
  navigation: DetailsScreenNavigation
};

export default function CryptoCoinLists({ navigation }: DetailsScreenProps) {
  
  const [selecteCategorie, setSelecteCategorie] = useState(1);
  const [selecteFilter, setSelecteFilter] = useState("")

  const dispatch = useAppDispatch();

  let selectorCryptoList = useAppSelector((state) => state.cryptoCoinList.cryptoCoinList);
  let selectorIsChangeFilter = useAppSelector((state) => state.cryptoCoinList.isChangeFilter);

  let [searchCoin, setSearchCoin] = useState("");
  
  const displayLoad = () => {
    try {
      dispatch(cryptCoinList());
    } catch(error){
      console.log("Errro no carregamento das listas");
    };
  };

  const handleClickCategorie = async(index: number, categoria: string ) => {
    setSelecteFilter(categoria);
    setSelecteCategorie(index); 
  };

  function handelDisplayCoinFiltred(displayCoinData: any) {

      setTimeout(() => {  
        dispatch(cryptoCoinListActions.changeFilter(false));  
        dispatch(displayCoinData);  
      }, 1000)
      dispatch(cryptoCoinListActions.changeFilter(true));  
    
  };

  useEffect(() => {
    handleClickCategorie(selecteCategorie, selecteFilter);
    
    if (selecteFilter === "Todas as CriptoMoedas") {
      displayLoad();
    } else if(selecteFilter === "Volume (Descrescente)") {
      handelDisplayCoinFiltred(cryptoCoinListActions.displayCoinFilterByVolDesc());
    } else if (selecteFilter === "Volume (Crescente)") {
      handelDisplayCoinFiltred(cryptoCoinListActions.displayCoinFilterByVolCres());
    } else if (selecteFilter === "Preço (Decrescente)") {
      handelDisplayCoinFiltred(cryptoCoinListActions.displayCoinFilterByPriceDesc());
    } else if (selecteFilter === "Preço (Crescente)") {
      handelDisplayCoinFiltred(cryptoCoinListActions.displayCoinFilterByPriceCres());
    };
    
  }, [selecteFilter]);

  const getSearch = (coin: string) => {
    setSearchCoin(coin);
  };

  useEffect(() => {
    dispatch(cryptoCoinListActions.displaySeacrCoin(searchCoin));

    if (searchCoin.length === 0) {
      dispatch(cryptCoinList());
    }
  }, [searchCoin]);

  useEffect(() => {
    displayLoad();
  }, []);


  const loadComponents = [
    <Categories selecteCategorie={selecteCategorie} handleClickCategorie={handleClickCategorie} />,
    <RenderCryptoCoin cryptoCoinDataList={selectorCryptoList} navigation={navigation} /> 
  ];


  return (
    <MainLayoutCrypto>
      <StatusBar barStyle="light-content" />

      <SafeAreaView className='flex-1 items-center mt-7 space-y-6'>
        <Text className='text-gray-200'>CriptoListas</Text>

        <View className='mt-4 mx-5'>
          <View className='flex-row items-center w-full justify-between p-1 rounded-full bg-white'>
            <TextInput placeholder='Pesquise... ' className='flex-1 p-4' onChangeText={coin => setSearchCoin(coin)} value={searchCoin} />
            <Feather name="search" size={40} color={'black'} onPress={() => getSearch(searchCoin)} />
          </View>
        </View>

        {
          selectorIsChangeFilter ? (<ActivityIndicator size="large" color={'white'} className="mt-20" />) 
          : (
            <FlatList 
              data={loadComponents}
              keyExtractor={(item, index) => String(index)}
              renderItem={({item}) => <View>{item}</View>}
            />
          )
        }
        
      </SafeAreaView>
    </MainLayoutCrypto>
  );
};