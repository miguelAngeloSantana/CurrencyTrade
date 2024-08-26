import { useEffect, useState } from 'react';
import { View, Text, Linking, TouchableOpacity } from 'react-native';

import axios from 'axios';

import RenderDetailsCurrency from './RenderDetailsCurrency';

interface DetailsProps {
  symbol: string
  name: string
};

interface ReadMoreProps {
  children: string
};


export default function DetailsCurrency({ symbol, name }: DetailsProps) {

  const [ infoDetails, setInfoDetails ] = useState({
    MKTCAP: 0,
    TOTALVOLUME24H: 0,
    CIRCULATINGSUPPLY: 0,
    LOW24HOUR: 0,
    HIGH24HOUR: 0
  });

  const [ describeDetails, setDescribeDetails ] = useState({
    description: "",
    homepage: "",
    tradeUrl: ""
  });

  const fetchCoinDetails = async() => {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${name.toLocaleLowerCase()}`);
    const resData = await res.json();

    try{
        setDescribeDetails({
        description: resData.description.en,
        homepage: resData.links.homepage[0],
        tradeUrl: resData.tickers[3].trade_url
      })
    } catch(err) {
      setDescribeDetails({
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus possimus nulla similique, nisi neque commodi expedita magnam beatae ea porro explicabo exercitationem vero laborum ipsa alias consectetur inventore voluptas libero.",
        homepage: "https://www.binance.com/en",
        tradeUrl: "https://www.binance.com/en"
      })
      // console.log(err);
    };


    const { data } = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol.toLocaleUpperCase()}&tsyms=USD&relaxedValidation=true`);

    let dataAsArray = Object.values(data.RAW);

    for (let i = 0; i < dataAsArray.length; i++) {
      const res: any = dataAsArray[i];
      setInfoDetails({
        CIRCULATINGSUPPLY: res.USD.CIRCULATINGSUPPLY,
        HIGH24HOUR: res.USD.HIGH24HOUR,
        LOW24HOUR: res.USD.LOW24HOUR,
        MKTCAP: res.USD.MKTCAP,
        TOTALVOLUME24H: res.USD.TOTALVOLUME24H
      })
    };
  };


  useEffect(() =>{
    fetchCoinDetails();
  }, []);

  const ReadMore = ({children}: ReadMoreProps) => {
    const text = children;

    const [ showMore, setShowMore ] = useState(true);

    const toggle = () => {
      setShowMore(!showMore)
    };

    return (
        <Text className='text-gray-200 text-base'>
          {
            showMore ? text.slice(0, 90): describeDetails.description
          }

          <Text onPress={toggle} style={{color: "#33FF00"}} className={` ${!showMore && 'hidden'}`} aria-hidden={!showMore}>
            {showMore ? '...read more': ' read less'}
          </Text>
        </Text>
    );
  } ;

  return (

    <View className='flex flex-row w-full flex-wrap items-center justify-between mt-6 mb-5 px-6'>

      <View className='flex items-center justify-center mb-2'>
        <Text className='text-gray-400 text-base text-center mb-1'>About Coin</Text>         

        <ReadMore>
          {describeDetails.description}
        </ReadMore>

      </View>

      <View className=' my-3 w-full flex flex-row items-center justify-between flex-wrap'>
        <RenderDetailsCurrency 
          marketCap={infoDetails.MKTCAP}
          totVolume24={infoDetails.TOTALVOLUME24H}
          high={infoDetails.HIGH24HOUR}
          low={infoDetails.LOW24HOUR}
        />
      </View>

      <View className='flex flex-row items-center justify-between my-3 w-full'>
        <TouchableOpacity
          onPress={() => Linking.openURL(describeDetails.tradeUrl)}
          className='w-44 h-12 flex items-center justify-center bg-blue-500 rounded-xl text-center'
        >
            <Text className='text-gray-200 font-semibold text-base'>Shall/buy</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL(describeDetails.homepage)}
          className='w-44 h-12 flex items-center justify-center bg-green-500 rounded-xl'
        >
            <Text className='text-gray-200 font-semibold text-base'>Site Official</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};