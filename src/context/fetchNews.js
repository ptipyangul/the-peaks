import React, { useState, useReducer, useContext } from 'react';
import axios from 'axios';
import configs from '../configs.json';

export const GetNewsContext = React.createContext();

export const GetNewsContextProvider = ({ children }) => {
    const [ cancelState, setCancelState ] = useState([null]);
    let cancel = null;
    
    if ( cancel ) {
        cancel.cancel();
    }
    cancel = axios.CancelToken.source();

    const fetchNews = (qs, responseFun, errorFunc) => {

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