import React, {createContext, useState, useEffect} from 'react';

import axios from 'axios';

import ProductsAPI from './service/productsAPI';
import UserAPI from './service/userAPI';
import CategoriesAPI from './service/categoriesAPI';

export const GlobalState = createContext();

export function DataProvider({children}) {
    const [token, setToken] = useState(false);



    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){
            const refreshToken = async () =>{
                const res = await axios.get('/user/refresh_token');
                setToken(res.data.accessToken);
    
                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000 )
            }   
            refreshToken();
        }
    }, [])

    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI()
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
