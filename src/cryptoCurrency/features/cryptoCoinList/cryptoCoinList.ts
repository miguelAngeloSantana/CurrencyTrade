import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


import ModelCryptoCoin from "../../modelos/ModelCryptoCoin";
import enVariable from "../../../utils/enVariable";

interface CoinListProps {
    quote_currency: string
    base_currency: string
};


export const cryptCoinList = createAsyncThunk("CryptoListData/fetchCryptoList", async() => {

    try {

        const cryptoCoinResponse = await fetch('https://api.pro.coinbase.com/products');
        const cryptoCoinResponseData = await cryptoCoinResponse.json();
    
        const cryptoCurrency: string[] = [];

        const filtredMoversData = cryptoCoinResponseData.filter((coin: CoinListProps) => coin.quote_currency === 'USD');
    
        filtredMoversData.forEach((coin: CoinListProps) => {
            cryptoCurrency.push(coin.base_currency);
        });

        const arraySymbol = cryptoCurrency.join().slice(0, 1000);

        const { data } = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${arraySymbol}&tsyms=USD&relaxedValidation=true`)
    
        let dataSymbolsAsArray = Object.values(data.RAW);

        const cryptoCoinListDetail: ModelCryptoCoin[] = []

        const coinMarketData = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=${enVariable.API_KEY}`);
        const coinMarketResponse = await coinMarketData.json();

        const mapCryptoDetail = await coinMarketResponse.data.reduce((mapCryptoData: any, cryptoDetails: {  id: number, symbol: string, name: string}) => {
            mapCryptoData[cryptoDetails.symbol] = cryptoDetails;
            return mapCryptoData;
        });

        for (let i = 0; i < dataSymbolsAsArray.length; i++) {
            const cryptoCurrencyData:any = dataSymbolsAsArray[i];
            const arrayCryptoDetails = mapCryptoDetail[cryptoCurrencyData.USD.FROMSYMBOL];

            const cryptoId = arrayCryptoDetails?.id ?? 0;
            const cryptoName = arrayCryptoDetails?.name ?? "N/A";

            const cryptoData = new ModelCryptoCoin(
                cryptoId,
                cryptoName,
                cryptoCurrencyData.USD.FROMSYMBOL,
                cryptoCurrencyData.USD.PRICE,
                cryptoCurrencyData.USD.CHANGEPCT24HOUR
            );

            cryptoCoinListDetail.push(cryptoData);
        };

        return  cryptoCoinListDetail;
    } catch(error) {
        console.log("Error nas listas das cryptimoedas");
    };
});