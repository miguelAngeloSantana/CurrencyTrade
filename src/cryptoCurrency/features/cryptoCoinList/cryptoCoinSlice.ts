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
  reducers: {
    displayListCryptoCoin(state, action: PayloadAction<ModelCryptoCoin[]>) {
      state.listCoin = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(CryptoCoin.fulfilled, (state, action: PayloadAction<ModelCryptoCoin[]>) => {
      state.listCoin = action.payload
    })
  }
});

export const { displayListCryptoCoin} = cryptoCoinSlice.actions;

export const cryptoActions = cryptoCoinSlice.actions;

export const CryptoCoinListReducer = cryptoCoinSlice.reducer;
