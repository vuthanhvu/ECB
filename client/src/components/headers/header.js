import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { GlobalState } from "../../globalState";

import Menu from "./icon/menu.svg";
import Close from "./icon/close.svg";
import CartIcon from "./icon/cartIcon.svg";

import "./header.css";

export default function Header() {
    const value = useContext(GlobalState);
    return (
        <div className="container">
            <header>
                <div className="menu">
                    <img src={Menu} alt="" width="30" />
                </div>

                <div className="logo">
                    <h1>
                        <Link to="/products"> VTP Shop</Link>
                    </h1>
                </div>

                <ul>
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                    <li>
                        <Link to="/login">Login ❈ Register</Link>
                    </li>
                    <li>
                        <div className="menu">
                            <img src={Close} alt="" width="30" />
                        </div>
                    </li>
                </ul>
                <div className="cart-icon">
                    <span>0</span>
                    <Link to="/carts">
                        <img src={CartIcon} alt="" width="30" />
                    </Link>
                </div>
            </header>
        </div>
    );
}
