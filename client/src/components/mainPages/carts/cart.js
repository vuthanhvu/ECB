import React, { useContext, useState, useEffect } from "react";

import axios from 'axios';

import { GlobalState } from "../../../globalState";
import PaypalButton from './PaypalButton';

export default function Carts() {
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [cart, setCart] = state.userAPI.cart;

    const [total, setTotal] = useState(0);



    const addCart = async (cart) => {
        await axios.patch('user/add_cart', {cart}, {
            headers: {Authorization: token}
        })
    }
    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) =>{
                return prev + (item.price * item.quantity);
            }, 0)
            setTotal(total);
        }
        getTotal();
    },[cart]);

    const increment = (id) => {
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1;
            }
        })
        setCart([...cart]);
        addCart(cart);
    }

    const decrement = (id) => {
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1: item.quantity -= 1;
            }
        })
        setCart([...cart]);
        addCart(cart);
    }

    const removeProduct = (id) => {
        if(window.confirm("Do you want to delete this product ?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1);
                }
            })
            setCart([...cart]);
            addCart(cart);
        }
    }

    const tranSuccess = async (payment) => {
         const {paymentID, address} = payment;

         await axios.post('/api/payment', {cart, paymentID, address}, {
             headers: {Authorization: token}
         })

         setCart([]);
         addCart([]);
         alert("You have successfully placed an order");
    }

    if (cart.length === 0)
        return (
            <h2 style={{ textAlign: "center", fontSize: "3rem" }}>
                Cart empty
            </h2>
        );

    return (
        <div>
            {cart.map((product) => (
                <div className="detail cart" key={product._id}>
                    <div className="detail-img">
                        <img src={product.images.url} alt="" />
                    </div>

                    <div className="box-detail">
                        <h2>{product.title}</h2>

                        <span>$ {product.price * product.quantity}</span>
                        <p>{product.description}</p>
                        <p>{product.content}</p>

                        <div className="amount">
                            <button onClick={ () => decrement(product._id) }> - </button>
                            <span>{product.quantity}</span>
                            <button onClick={ () => increment(product._id) }> + </button>
                        </div>

                        <div className="delete" onClick={() => removeProduct(product._id) }>X</div>
                    </div>
                </div>
            ))}

            <div className="total">
                <h3>Total: $ {total}</h3>
                <PaypalButton 
                total={total}
                tranSuccess={tranSuccess}/>
            </div>
        </div>
    );
}
