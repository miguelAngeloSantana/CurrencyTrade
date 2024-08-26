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
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(CryptoNews.fulfilled, (state, action: PayloadAction<ModelNews[] | undefined>) => {
            state.newsData = action.payload ?? []
        })
    }
});

export const NewsReducer  = cryptoNews.reducer;