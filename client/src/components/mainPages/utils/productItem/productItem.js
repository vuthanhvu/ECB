import React, {useState} from "react";

import BtnRender from "./btnRender";
import Loading from '../loading/loading';

export default function ProductItem({ product, isAdmin, loading , deleteProduct, handleCheck }) {

    if(loading) return <div className="product_card"><Loading /></div> 

    return (
        <div className="product_card">
            {
                isAdmin && <input type="checkbox" checked={product.checked} 
                onChange={() => handleCheck(product._id)}/>
            }
            <div className="product_image">
                <img src={product.images.url} alt="" />
            </div>

            <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>
                <span>${product.price}</span>
                <p>{product.description}</p>
            </div>

            <BtnRender product={product} deleteProduct={deleteProduct}/>
        </div>
    );
}
