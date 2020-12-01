import React,{useContext} from "react";
import { Switch, Route } from "react-router-dom";

import {GlobalState} from '../../globalState';
import Products from './products/products';
import DetailProduct from './detailProduct/detailProduct';
import Carts from './carts/cart';
import Login from './auth/login';
import Register from './auth/register';
import OrderHistory from './history/orderHistory';
import OrderDetailHistory from './history/orderDetailHistory';
import Categories from './categories/categories';
import CreateProduct from './createProduct/createProduct';

import NotFound from './utils/notFound/notFound';

export default function MainPages() {
    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;

    return (
        <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/products" exact component={Products} />
            <Route path="/detail/:id" exact component={DetailProduct} />

            <Route path="/carts" exact component={Carts} />

            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound: Register} />

            <Route path="/history" exact component={isLogged ? OrderHistory : NotFound} />
            <Route path="/history/:id" exact component={isLogged ? OrderDetailHistory : NotFound} />

            <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
            <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound} />
            <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound} />


            <Route path="*" exact component={NotFound} />
        </Switch>
    );
}
