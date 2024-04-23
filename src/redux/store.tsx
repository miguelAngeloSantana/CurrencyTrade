import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook ,useDispatch, useSelector } from "react-redux";

import { currencyReducer } from "../redux/currencySlice";

export const store = configureStore({
    reducer: {
        Currency: currencyReducer
    }
})

export type rootReducer = ReturnType<typeof store.getState>

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector;
export const useAppSelector: TypedUseSelectorHook<rootReducer>=useSelector;