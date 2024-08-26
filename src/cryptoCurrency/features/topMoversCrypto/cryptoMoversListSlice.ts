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
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(CryptoMovers.fulfilled, (state, action: PayloadAction<ModelCryptoCoin[] | undefined>) => {
            state.topMoversData = action.payload ?? [];
        })
    }
});

export const CryptoMoversListReducer = cryptoMoversListSlice.reducer;