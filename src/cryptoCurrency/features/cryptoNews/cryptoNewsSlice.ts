import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import ModelNews from '../../modelos/ModelNews';
import { CryptoNews } from './CryptoNews';

export interface NewsProps {
    newsData: ModelNews[]
};

const initialState: NewsProps = {
    newsData: []
};

export const cryptoNews = createSlice({
    name: "News",
    initialState,
    reducers: {
        displayNew(state, action:PayloadAction<ModelNews[]>) {
            state.newsData = action.payload
        }
    },  

    extraReducers: (builder) => {
        builder.addCase(CryptoNews.fulfilled, (state, action: PayloadAction<ModelNews[]>) => {
            state.newsData = action.payload
        })
    }
});

export const { displayNew } = cryptoNews.actions;

export const newsDataAction = cryptoNews.actions;

export const NewsReducer  = cryptoNews.reducer;