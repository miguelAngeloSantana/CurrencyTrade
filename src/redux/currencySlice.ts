import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PorpsCurrencySlice {
    isTradeModelVisible: boolean 
    chooseCurrency: string
}

const initialState:PorpsCurrencySlice = {
    isTradeModelVisible: false,
    chooseCurrency: "CryptoCurrency"
}

const slice = createSlice({
    name: "Currency",
    initialState,
    reducers: {
        changeVisibiliteModel(state, action: PayloadAction<boolean>) {
            state.isTradeModelVisible = action.payload
        },

        renderChooseCurrency(state, action: PayloadAction<string>) {
            state.chooseCurrency = action.payload
        }
    }
})

export const { changeVisibiliteModel, renderChooseCurrency } = slice.actions

export const currencyReducer = slice.reducer