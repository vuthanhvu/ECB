import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { GlobalState } from "../../globalState";

import Menu from "./icon/menu.svg";
import Close from "./icon/close.svg";
import CartIcon from "./icon/cartIcon.svg";

import "./header.css";
import axios from "axios";

export default function Header() {
    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;
    const [cart] = state.userAPI.cart;
    const [menu, setMenu] = useState(false);

    const logOutUser = async () => {
        await axios.get('/user/logout');

        localStorage.removeItem('firstLogin');

        window.location.href ="/";

    }

    const adminRouter = () => {
        return (
            <>
                <li>
                    <Link to="/create_product">Create Product</Link>
                </li>
                <li>
                    <Link to="/category">Categories</Link>
                </li>
            </>
        );
    };

    const loggedRouter = () => {
        return (
            <>
                <li>
                    <Link to="/history">History</Link>
                </li>
                <li>
                    <Link to="/" onClick={logOutUser}>Log Out</Link>
                </li>
            </>
        );
    };

    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return (
        <header>
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width="30" />
            </div>

            <div className="logo">
                <h1>
                    <Link to="/products">{isAdmin ? "Admin" : "VTP Shop"}</Link>
                </h1>
            </div>

            <ul style={styleMenu}>
                <li>
                    <Link to="/products">{isLogged ? "Shop" : "Products"}</Link>
                </li>
                {isAdmin ? adminRouter() : null}
                {isLogged ? (
                    loggedRouter()
                ) : (
                    <li>
                        <Link to="/login">Login ❈ Register</Link>
                    </li>
                )}

                <li>
                    <div className="menu" onClick={() => setMenu(!menu)}>
                        <img src={Close} alt="" width="30" />
                    </div>
                </li>
            </ul>
            {isAdmin ? null : (
                <div className="cart-icon">
                    <span>{cart.length}</span>
                    <Link to="/carts">
                        <img src={CartIcon} alt="" width="25" />
                    </Link>
                </div>
            )}
        </header>
    );
}
