import React, {createContext, useState, useEffect} from 'react';

import axios from 'axios';

import ProductsAPI from './api/productsAPI';
import UserAPI from './api/userAPI';

export const GlobalState = createContext();

export function DataProvider({children}) {
    const [token, setToken] = useState(false);

    const refreshToken = async () =>{
        const res = await axios.get('/user/refresh_token');
        setToken(res.data.accessToken);
    }   

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin');
        if(firstLogin) refreshToken();
    }, [])

    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        userAPI: UserAPI(token)
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
