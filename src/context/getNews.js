import React, { useState, useReducer, useContext } from 'react';
import axios from 'axios';
import configs from '../configs.json';

export const GetNewsContext = React.createContext();

export const GetNewsContextProvider = ({ children }) => {
    const [ newsResponse, setNewsResponse ] = useState(['test']);

    const fetchNews = (qs, responseFun, errorFunc) => {

        const url = `${configs.NEWS_API_ENDPOINT}${qs}&api-key=${configs.NEWS_API_KEY}`

        axios.get(url)
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