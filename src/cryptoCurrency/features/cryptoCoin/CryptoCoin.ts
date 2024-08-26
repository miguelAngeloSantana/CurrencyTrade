import { createAsyncThunk } from "@reduxjs/toolkit";

import ModelCryptoCoin from "../../modelos/ModelCryptoCoin";
import enVariable from "../../../utils/enVariable";

export const CryptoCoin = createAsyncThunk("CryptoList/fetchCryptoData", async () => {
    const cryptoSymbols = ['BTC', 'ETH', 'USDT', 'LINK', 'ADA'];

    try {
        const response = await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSymbols.join()}&tsyms=USD&relaxedValidation=true`);
        const cryptoCoinResonse = await response.json();

        const apiCoinMarket = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=${enVariable.API_KEY}`);
        const apiData = await apiCoinMarket.json();

        const cryptoCoinData:ModelCryptoCoin[] = [];

        cryptoSymbols.forEach(coin => {
            const cryptoCoinDetails = cryptoCoinResonse.RAW[coin].USD;
            const apiDataDetails = apiData.data.find((coinData: { symbol:string }) => cryptoCoinDetails.FROMSYMBOL === coinData.symbol);
            const cryptoCoinID = apiDataDetails?.id ?? 0;
            const cryptoCoinName = apiDataDetails?.name ?? 'N/A';

            cryptoCoinData.push(
                new ModelCryptoCoin (
                    cryptoCoinID,
                    cryptoCoinName,
                    coin,
                    cryptoCoinDetails.PRICE,
                    cryptoCoinDetails.CHANGEPCT24HOUR
                )
            );
        });

        return cryptoCoinData;
    
    } catch(error) {
        console.log("Deu pane: ", error)
    }
});