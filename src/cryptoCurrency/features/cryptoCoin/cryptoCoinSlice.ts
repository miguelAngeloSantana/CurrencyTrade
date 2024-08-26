import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import ModelCryptoCoin from "../../modelos/ModelCryptoCoin";
import { CryptoCoin } from "./CryptoCoin";


export interface CryptoCoinState {
  listCoin: ModelCryptoCoin[];
};

const initialState: CryptoCoinState = {
  listCoin: [],
};


export const cryptoCoinSlice = createSlice({
    
  name: "CryptoList",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(CryptoCoin.fulfilled, (state, action: PayloadAction<ModelCryptoCoin[] | undefined>) => {
      state.listCoin = action.payload ?? []
    })
  }
});

export const CryptoCoinReducer = cryptoCoinSlice.reducer;
