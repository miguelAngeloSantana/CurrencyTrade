import { createAsyncThunk } from "@reduxjs/toolkit";

import ModelNews from '../../modelos/ModelNews';


export const CryptoNews = createAsyncThunk("News/fetchNews", async() => {
    try {
        const response = await fetch('https://min-api.cryptocompare.com/data/v2/news/?lang=EN');
        const responseData = await response.json();

        let newsData: ModelNews[] = [];

        for (const news of responseData.Data) {
            const formatDate = new Date(news.published_on * 1000)
                .toString()
                .split(' ')
                .splice(1, 2)
                .join(' ')

            newsData.push(
                new ModelNews(
                    news.source_info.name,
                    formatDate,
                    news.title,
                    news.imageurl,
                    news.url
                )
            );

            if (newsData.length === 21) {
                break;
            };
        };

        const arrayUnicos = newsData.filter((itens, index) => {
            return index === newsData.findIndex(item => item.url === itens.url)
        });

        return arrayUnicos;

    } catch(error) {
        console.log("Error ao buscas as notícias: ", error);
    }
});