import React, {createContext, useState, useEffect} from 'react';

import axios from 'axios';

import ProductsAPI from './api/productsAPI';

export const GlobalState = createContext();

export function DataProvider({children}) {
    const [token, setToken] = useState(false);

    const refreshToken = async () =>{
        const res = await axios.get('/user/refresh_token');
        console.log(res);
        setToken(res.data.accessToken);
    }   

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin');
        if(firstLogin) refreshToken();
    }, [])

    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI()
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
