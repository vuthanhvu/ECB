import React from "react";
import { Switch, Route } from "react-router-dom";

import Products from './products/products';
import DetailProduct from './detailProduct/detailProduct';
import Carts from './carts/cart';
import Login from './auth/login';
import Register from './auth/register';
import NotFound from './utils/notFound/notFound';


export default function MainPages() {
    return (
        <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/products" exact component={Products} />
            <Route path="/detail/:id" exact component={DetailProduct} />

            <Route path="/carts" exact component={Carts} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />



            <Route path="*" exact component={NotFound} />
        </Switch>
    );
}
