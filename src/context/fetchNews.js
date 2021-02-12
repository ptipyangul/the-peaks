import React from 'react';
import axios from 'axios';
import configs from '../configs.json';

export const GetNewsContext = React.createContext();

export const GetNewsContextProvider = ({ children }) => {
    const fetchNews = (qs, responseFun, errorFunc, cancel) => {

        const url = `${configs.NEWS_API_ENDPOINT}${qs}&api-key=${configs.NEWS_API_KEY}`

        axios.get(url, { cancelToken: cancel.token })
            .then(response => responseFun(response))
            .catch(error => errorFunc(error));
    }
    return (
        <GetNewsContext.Provider
            value={{ fetchNews }}>
            {children}
        </GetNewsContext.Provider>
    );
}