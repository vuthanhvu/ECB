import React,{useContext} from "react";
import { Switch, Route } from "react-router-dom";

import {GlobalState} from '../../globalState';
import Products from './products/products';
import DetailProduct from './detailProduct/detailProduct';
import Carts from './carts/cart';
import Login from './auth/login';
import Register from './auth/register';
import OrderHistory from './history/orderHistory';
import NotFound from './utils/notFound/notFound';


export default function MainPages() {
    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged;
    return (
        <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/products" exact component={Products} />
            <Route path="/detail/:id" exact component={DetailProduct} />

            <Route path="/carts" exact component={Carts} />

            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound: Register} />

            <Route path="/history" exact component={isLogged ? OrderHistory : NotFound} />

            <Route path="*" exact component={NotFound} />
        </Switch>
    );
}
