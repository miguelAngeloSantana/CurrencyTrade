import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { currencyReducer } from "../redux/currencySlice";
import { CryptoCoinListReducer } from "../cryptoCurrency/features/cryptoCoinList/cryptoCoinSlice";
import { CryptoMoversListReducer } from "../cryptoCurrency/features/topMoversCrypto/cryptoMoversListSlice";
import { NewsReducer } from "../cryptoCurrency/features/cryptoNews/cryptoNewsSlice";

export const store = configureStore({
    reducer: {
        Currency: currencyReducer,
        CryptoCoin: CryptoCoinListReducer,
        topMoversCrypto: CryptoMoversListReducer,
        News: NewsReducer
    },
    
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export type rootReducer = ReturnType<typeof store.getState>;
// export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<rootReducer>=useSelector;