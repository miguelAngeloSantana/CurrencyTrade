import { createAsyncThunk } from "@reduxjs/toolkit";

import ModelCryptoCoin from "../../modelos/ModelCryptoCoin";
import axios from "axios";

import enVariable from "../../../utils/enVariable";

export interface CryptoMoversProps {
    quote_currency: string
    base_currency: string
};

export const CryptoMovers = createAsyncThunk("topMoversList/fetchTopMoversData", async() => {
    try {
        const topMoversResponse = await fetch('https://api.pro.coinbase.com/products');
        const topMoversCryptoData = await topMoversResponse.json();


        const moversCoin: string[] = [];
    
        const filtredMoversData = topMoversCryptoData.filter((coin: CryptoMoversProps) => coin.quote_currency === 'USD');
    
        filtredMoversData.forEach((coin: CryptoMoversProps) => {
          moversCoin.push(coin.base_currency);
        });
    
        const arraySymboysMovers = moversCoin.join().slice(0, 1000);

        const { data } = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?tsyms=USD&relaxedValidation=true&fsyms=${arraySymboysMovers}`);
       
        let moversDataAsArray = Object.values(data.RAW);
     
        moversDataAsArray.sort((a: any, b: any) =>
          Math.abs(a.USD.CHANGEPCT24HOUR) < Math.abs(b.USD.CHANGEPCT24HOUR) ? 1 : -1
        );      


        const cryptoCoinData: ModelCryptoCoin[] = [];

        const apiCryptoCoinResponse = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=${enVariable.API_KEY}`);
        const apiCryptoCoinData = await apiCryptoCoinResponse.json();


        const arrayDetailCryptoCoin = await apiCryptoCoinData.data.reduce((dataCryptoCoin: any, crypotCoinData: {id: number, symbol: string, name: string}) => {
            dataCryptoCoin[crypotCoinData.symbol] = crypotCoinData;
            return dataCryptoCoin;
        }, {});
    
        for (let i = 0; i < moversDataAsArray.length; i++) {
            const moversData:any = moversDataAsArray[i];
            const apiCryptoCoinDetails = arrayDetailCryptoCoin[moversData.USD.FROMSYMBOL];
        
            const cryptoCoinId = apiCryptoCoinDetails?.id ?? 0;
            const cryptoCoinName = apiCryptoCoinDetails?.name ?? 'N/A';
        
            const coinData = new ModelCryptoCoin(
                cryptoCoinId,
                cryptoCoinName,
                moversData.USD.FROMSYMBOL,
                moversData.USD.PRICE,
                moversData.USD.CHANGEPCT24HOUR
            );
    
            cryptoCoinData.push(coinData);
    
            if (cryptoCoinData.length === 6) {
                break;
            };
        };
        return cryptoCoinData;
    } catch (error) {
        console.log("Top Movers Error: ", error);
    }
});