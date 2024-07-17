import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import ModelCryptoCoin from "../../modelos/ModelCryptoCoin";
import { cryptCoinList } from "./cryptoCoinList";

export interface CryptoCoinListState {
    cryptoCoinList: ModelCryptoCoin[]
    cryptoCoinSearch: ModelCryptoCoin[]
    isChangeFilter: boolean
};

const initialState: CryptoCoinListState = {
    cryptoCoinList: [],
    cryptoCoinSearch: [],
    isChangeFilter: false
}

const cryptoCoinListSlice = createSlice({
    name: "cyptoListData",
    initialState,
    reducers: {

        changeFilter(state, action: PayloadAction<boolean>)  {
            return {
                ...state,
                isChangeFilter: action.payload
            }
        },

        displayCryptoCoin(state, action: PayloadAction<ModelCryptoCoin[]>) {
            state.cryptoCoinList = action.payload
        },

        displayCoinFilterByVolDesc(state) {
            return {
                ...state,
                cryptoCoinList:  [...state.cryptoCoinList].sort((a: any, b:any) => 
                    Math.abs(a.percentChange) < Math.abs(b.percentChange) ? 1 : -1 
                ),
            };
        },

        displayCoinFilterByVolCres(state) {
            return {
                ...state,
                cryptoCoinList: [...state.cryptoCoinList].sort((a: any, b:any) => 
                    Math.abs(a.percentChange) > Math.abs(b.percentChange) ? 1 : -1
                ),
            }
        },

        displayCoinFilterByPriceDesc(state) {
            return {
                ...state,
                cryptoCoinList: [...state.cryptoCoinList].sort((a: any, b:any) => 
                    Math.abs(a.price) < Math.abs(b.price) ? 1 : -1
                ),
            }
        },

        displayCoinFilterByPriceCres(state) {
            return {
                ...state,
                cryptoCoinList: [...state.cryptoCoinList].sort((a: any, b:any) => 
                    Math.abs(a.price) > Math.abs(b.price) ? 1 : -1
                ),
            }
        },

        displaySeacrCoin(state, action) {
            state.cryptoCoinList = state.cryptoCoinSearch.filter((coin) => 
                coin.name.toLocaleLowerCase().includes(action.payload.toLocaleLowerCase())
            );
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(cryptCoinList.fulfilled, (state, action: PayloadAction<ModelCryptoCoin[] | undefined>) => {
            state.cryptoCoinList = action.payload ?? [];
            state.cryptoCoinSearch = action.payload ?? [];
            state.isChangeFilter = false;
        })
    }
});

export const cryptoCoinListReducer = cryptoCoinListSlice.reducer;
export const cryptoCoinListActions = cryptoCoinListSlice.actions;