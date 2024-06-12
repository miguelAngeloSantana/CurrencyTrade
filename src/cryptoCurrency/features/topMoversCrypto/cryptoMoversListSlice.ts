import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import ModelCryptoCoin from "../../modelos/ModelCryptoCoin";
import { CryptoMovers } from "./CryptoMovers";

export interface CryptoMoversList {
    topMoversData: ModelCryptoCoin[];
};

const initialState: CryptoMoversList = {
    topMoversData: []
};

export const cryptoMoversListSlice = createSlice({
    name: "topMoversList",
    initialState,
    reducers: {
        displayMoversCrypto(state, action: PayloadAction<ModelCryptoCoin[]>) {
            state.topMoversData = action.payload
        }
    },

    extraReducers: (builder) => {
        builder.addCase(CryptoMovers.fulfilled, (state, action: PayloadAction<ModelCryptoCoin[]>) => {
            state.topMoversData = action.payload;
        })
    }
});

export const { displayMoversCrypto } = cryptoMoversListSlice.actions;

export const topMoversCrypto = cryptoMoversListSlice.actions;

export const CryptoMoversListReducer = cryptoMoversListSlice.reducer;